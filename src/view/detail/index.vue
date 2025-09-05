<template>
    <div class="detail">
        <div style="position: relative;">
            <van-swipe class="my-swipe" ref="swipeRef" :autoplay="3000" indicator-color="white" @change="setTabActive">
                <van-swipe-item v-for="(item, index) in imgList">
                    <img :src="item.url" style="width: 100%;height: 10rem;">
                </van-swipe-item>
                <template #indicator="{ active, total }">
                  <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
                </template>
            </van-swipe>
            <div style="width: 100%;" class="type-box">
                <div @click="setTypeTab('plant')" v-if="detailValue.environment.plant.length > 0" :class="imgType == 'plant'? 'active': ''">厂区</div>
                <div @click="setTypeTab('work')" v-if="detailValue.environment.work.length > 0" :class="imgType == 'work'? 'active': ''">工作</div>
                <div @click="setTypeTab('meal_room')" v-if="detailValue.environment.meal_room.length > 0" :class="imgType == 'meal_room'? 'active': ''">食宿</div>
                <div @click="setTypeTab('life')" v-if="detailValue.environment.life.length > 0" :class="imgType == 'life'? 'active': ''">生活</div>
            </div>
            <div class="go-back" @click="goback">
                <van-icon name="arrow-left" />
            </div>
        </div>

        <div class="detail-card">
            <van-cell value-class="job-info">
                <van-row style="padding-top: 8px;">
                    <van-col span="12" class="job-name">{{ detailValue.base_info.title }}</van-col>
                    <van-col span="12" style="text-align: right;">
                        <span>刷新时间: {{ formatter(detailValue.base_info.updated_at) }}</span>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="12" style="color: rgb(249, 70, 31);">{{ detailValue.base_info.salary.scale
                        }}</van-col>
                    <van-col span="12" class="info-right" style="text-align: right;">
                        <span>{{ detailValue.base_info.salary.label }}</span>
                        <span>{{ detailValue.base_info.salary.desc }}</span>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <span>岗位还缺:</span>
                    <span>{{ detailValue.base_info.vacancy_count }}</span>
                </van-row>
            </van-cell>
            <van-cell value-class="job-tab">
                <van-tag round type="primary" v-for="(item, index) in detailValue.base_info.tags" :key="index"
                    style="color: #999999;" color="#f5f5f5">{{ item }}</van-tag>
            </van-cell>
            <van-cell class="cell-footer">
                <span style="margin-right: 5px;">地址:</span>
                <span>{{ detailValue.base_info.address }}</span>
            </van-cell>
        </div>
        <div class="detail-card">
            <van-cell>
                <h3 class="detail-title">职位要求</h3>
            </van-cell>
            <van-cell>
                <span>年龄: </span>
                <span>{{ detailValue.requirement.age_scale }}</span>
            </van-cell>
            <van-cell>
                <span>学历: </span>
                <span>{{ detailValue.requirement.education }}</span>
            </van-cell>
            <van-cell>
                <span>性别: </span>
                <span>{{ detailValue.requirement.gender }}</span>
            </van-cell>
            <van-cell style="padding-bottom: 10px;">
                <span>民族: </span>
                <span>{{ detailValue.requirement.ethnicity.toString() }}</span>
            </van-cell>
        </div>
        <div class="detail-card">
            <van-cell>
                <h3 class="detail-title">工资待遇</h3>
            </van-cell>
            <van-cell style="padding-bottom: 10px;">
                {{ detailValue.salary_intoduce }}
            </van-cell>
        </div>
        <div class="detail-card">
            <van-cell>
                <h3 class="detail-title">饮食住宿</h3>
            </van-cell>
            <van-cell style="padding-bottom: 10px;">
                {{ detailValue.accommodation }}
            </van-cell>
        </div>
        <div class="detail-card">
            <van-cell>
                <h3 class="detail-title">其他说明</h3>
            </van-cell>
            <van-cell style="padding-bottom: 10px;">
                {{ detailValue.notes }}
            </van-cell>
        </div>
        <div class="detail-card">
            <van-cell>
                <h3 class="detail-title">企业简介</h3>
            </van-cell>
            <van-cell>
                <div style="display: flex;justify-content: space-between;align-items: center;" @click="toCompanyDetail">
                    <div>
                        <div style="display: flex;align-items: center;">
                            <div>
                                <van-image width="3rem" height="3rem" fit="cover" position="left"
                                    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                            </div>
                            <div>
                                <van-cell>{{ detailValue.company.name }}</van-cell>
                                <van-cell>
                                    <van-rate color="#ffd21e" v-model="detailValue.company.review.score" />
                                    <span style="margin-right: 10px;">{{ detailValue.company.review.score }}分</span>
                                    <span
                                        style="display: inline-block;border-left: 1px solid #ddd;padding-right: 2px;">{{
                                            detailValue.company.review.count }}条点评</span>
                                </van-cell>
                            </div>
                        </div>
                        <div>
                            <van-icon name="location" />
                            <span>{{ detailValue.company.address }}</span>
                        </div>
                    </div>
                    <div>
                        <van-icon name="arrow" style="font-size: 24px;" />
                    </div>
                </div>
            </van-cell>
        </div>

        <div class="detail-footer">
            <van-cell style="position: fixed; bottom: 0;">
                <div class="footer-flex">
                    <span style="margin-right: 20px;">
                        <van-image round width="3rem" height="3rem"
                            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                    </span>
                    <span style="margin-right: 20px;">XXXX</span>
                    <a class="call-phone" :href="'tel:' + detailValue.customer.mobile">
                        <span style="margin-right: 5px;">
                            <van-icon name="phone" />
                        </span>
                        <span>电话咨询</span>
                    </a>
                </div>
            </van-cell>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount, watch } from 'vue';
import router from '@/router';
import moment from 'moment'
import { useRoute } from 'vue-router';

const value = ref(3);
const swipeRef = ref()
const detailValue = ref()
const imgList = ref([])
const imgType = ref('')
const route = useRoute()

console.log(router, 'router')

onBeforeMount(() => {
    console.log('11111111111111111')
    onLoad()
})

const onLoad = () => {
    detailValue.value = {
        environment: {
            plant: [
                "https://snowyapi.xiaonuo.vip/dev/file/download?id=1922285085292511234&tenCode=snowy",
                "https://snowyapi.xiaonuo.vip/dev/file/download?id=1922286178848227329&tenCode=snowy"

            ],
            work: [
                "https://snowyapi.xiaonuo.vip/dev/file/download?id=1922286559204491265&tenCode=snowy",
                "https://snowyapi.xiaonuo.vip/dev/file/download?id=1922287266762604545&tenCode=snowy"
            ],
            meal_room: [
                "https://snowyapi.xiaonuo.vip/dev/file/download?id=1922287907408986114&tenCode=snowy",
                "https://snowyapi.xiaonuo.vip/dev/file/download?id=1936948976938926082"
            ],
            life: [
                "https://snowyapi.xiaonuo.vip/dev/file/download?id=1936948514688876546",
                "https://snowyapi.xiaonuo.vip/dev/file/download?id=1935264681694347265"
            ]
        },
        base_info: {
            title: "万祥小时工",
            updated_at: "2025-09-01 16:55:20",
            salary: {
                scale: "5000-6000元/月",
                label: "工价",
                desc: "20元/小时"
            },
            tags: [
                "清真食堂",
                "包吃包住",
                "厂车接送",
                "普通工衣",
                "两班倒"
            ],
            address: "苏州市吴中经济开发区淞葭路1688号",
            vacancy_count: 200,
            stop_recruit_at: ""
        },
        requirement: {
            age_scale: "18-50",
            gender: "不限",
            education: "高中",
            ethnicity: [
                "回族",
                "汉族"
            ]
        },
        salary_intoduce: "工资按小时计算，20元/小时，正常每天工作8-12小时（以车间产量而定），工作不满三天或自离扣200元，月综合工资5000至6000元/月，每月20日准时发放上月工资。",
        accommodation: "公司免费提供工作餐，免费提供住宿6-8人间，水电费自理",
        notes: "1.面试时间1点（无临时宿舍）\n2.面试要求：口齿清楚，身体健康，简单识字，会写简历表\n3.体检费男60元，女65元，商保70元/月,住宿押金20元（离职满七天可退），厂牌20元自费",
        company: {
            id: 17,
            logo: "company/logo/normal/1756693509276839893257570.jpg",
            name: "苏州万祥科技股份有限公司",
            address: "苏州市吴中经济开发区淞葭路1688号",
            review: {
                count: 8,
                score: 4.2
            }
        },
        customer: {
            name: "Sam",
            mobile: "18262397326"
        }
    }
    detailValue.value.environment.plant.forEach((item, index) => {
        imgList.value.push({
            url: item,
            type: 'plant',
            index: index
        })
    });
    detailValue.value.environment.work.forEach((item, index) => {
        imgList.value.push({
            url: item,
            type: 'work',
            index: index
        })
    });
    detailValue.value.environment.meal_room.forEach((item, index) => {
        imgList.value.push({
            url: item,
            type: 'meal_room',
            index: index
        })
    });
    detailValue.value.environment.life.forEach((item, index) => {
        imgList.value.push({
            url: item,
            type: 'life',
            index: index
        })
    });
};
const toCompanyDetail = () => {
    router.push('companyDetail');
}
const setTabActive = (index) => {
    imgType.value = imgList.value[index].type
}
const setTypeTab = (type) => {
    const index = imgList.value.findIndex(item => {
        return item.type == type
    })
    swipeRef.value.swipeTo(index)
}
const goback = () => {
  router.go(-1)
}
const formatter = (date) => {
    return date? moment(date).format('YYYY-MM-DD') : ''
}

</script>

<style lang="scss">
.detail {
    background-color: #f5f5f5;

    .detail-card {
        margin: 10px 8px;
        border-radius: 10px;
        overflow: hidden;

        .van-cell {
            padding: 4px 16px;
        }
    }

    .info-right {
    font-size: 0.7rem;
    border-radius: 10px;

    >span:first-child {
        background-color: #2ee3d0;
        color: #fff;
        padding: 6px;
        font-size: 0.7rem;
        border-radius: 5px 0 0 5px;
    }

    >span:last-child {
        border: 1px solid #2ee3d0;
        border-radius: 0 5px 5px 0;
        padding: 3px;
        font-size: 0.8rem;
        color: #2ee3d0;
    }
}

    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }

    :root {
        --van-nav-bar-background: #2ee3d0;
        --van-nav-bar-icon-color: #fff;
        --van-nav-bar-height: 3.5rem;
        --van-tag-round-radius: 2px
    }

    .van-cell:after {
        display: none !important;
    }

    .van-cell__value {
        text-align: left;
    }

    .detail-title {
        margin: 0;
        padding: 10px 0;
        color: #000;
        border-bottom: 1px solid #eee;
    }

    .job-name {
        color: #000;
        font-size: 16px;
    }

    .cell-footer {
        border-top: 1px solid #eee;
        padding-bottom: 10px !important;
    }

    .detail-footer {
        position: relative;
        height: 4.5rem;
        bottom: 0;
    }

    .call-phone {
        border-radius: 10px;
        width: 10rem;
        height: 1rem;
        text-align: center;
        padding: 10px 20px;
        color: #fff;
        background-color: #2ee3d0;
        line-height: 1rem;
    }
    .footer-flex {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 16px;
    }
    .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        color: #fff;
    }
    .type-box {
        position: absolute;
        bottom: 5px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        color: #fff;
        >div {
            padding: 2px 10px;
            background-color: #2ee3d04d;
            margin-right: 1px
        }
    }
    .active {
        background-color: #2ee3d0 !important;
    }
    .go-back {
        font-size: 2rem;
        position: absolute;
        top: 1rem;
        color: #fff;
        left: 1rem;
    }
}
</style>
