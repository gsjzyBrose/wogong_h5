<template>
    <div class="detail">
        <div style="position: relative;">
            <van-swipe class="my-swipe" ref="swipeRef" :autoplay="false" indicator-color="white" @change="setTabActive">
                <van-swipe-item v-for="(item, index) in imgList">
                    <img :src="item.url" style="width: 100%;height: 17rem;">
                </van-swipe-item>
                <template #indicator="{ active, total }">
                    <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
                </template>
            </van-swipe>
            <div style="width: 100%;" class="type-box">
                <div @click="setTypeTab('plant')" v-if="detailValue?.environment?.plant.length > 0"
                    :class="imgType == 'plant' ? 'active' : ''">厂区</div>
                <div @click="setTypeTab('work')" v-if="detailValue?.environment?.work.length > 0"
                    :class="imgType == 'work' ? 'active' : ''">工作</div>
                <div @click="setTypeTab('meal_room')" v-if="detailValue?.environment?.meal_room.length > 0"
                    :class="imgType == 'meal_room' ? 'active' : ''">食宿</div>
                <div @click="setTypeTab('life')" v-if="detailValue?.environment?.life.length > 0"
                    :class="imgType == 'life' ? 'active' : ''">生活</div>
            </div>
            <div class="go-back" @click="goback">
                <van-icon name="arrow-left" />
            </div>
        </div>


       <div class="detail-card">
            <van-cell value-class="job-info">
                <van-row style="padding-top: 8px;">
                    <van-col span="12" class="job-name">{{ detailValue?.base_info?.title }}</van-col>
                    <van-col span="12" style="text-align: right;">
                        <span>刷新时间: {{ formatter(detailValue?.base_info?.updated_at) }}</span>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <van-col span="12" style="color: rgb(249, 70, 31);">{{ detailValue?.base_info?.salary?.scale
                    }}</van-col>
                    <van-col span="12" class="info-right" style="text-align: right;">
                        <span>{{ detailValue?.base_info?.salary?.label }}</span>
                        <span>{{ detailValue?.base_info?.salary?.desc }}</span>
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row>
                    <span>岗位还缺:</span>
                    <span>{{ detailValue?.base_info?.vacancy_count }}</span>
                </van-row>
            </van-cell>
            <van-cell value-class="job-tab">
                <van-tag round type="primary" v-for="(item, index) in detailValue?.base_info?.tags" :key="index"
                    style="color: #999999;" color="#f5f5f5">{{ item }}</van-tag>
            </van-cell>
            <van-cell class="cell-footer">
                <span style="margin-right: 5px;">地址:</span>
                <span>{{ detailValue?.base_info?.address }}</span>
            </van-cell>
        </div>
        <div class="detail-card">
            <van-cell>
                <h3 class="detail-title">职位要求</h3>
            </van-cell>
            <van-cell>
                <span>年龄: </span>
                <span>{{ detailValue?.requirement?.age_scale }}</span>
            </van-cell>
            <van-cell>
                <span>学历: </span>
                <span>{{ detailValue?.requirement?.education }}</span>
            </van-cell>
            <van-cell>
                <span>性别: </span>
                <span>{{ detailValue?.requirement?.gender }}</span>
            </van-cell>
            <van-cell style="padding-bottom: 10px;">
                <span>民族: </span>
                <span>{{ detailValue?.requirement?.ethnicity.toString() }}</span>
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
                <div style="display: flex;justify-content: space-between;align-items: center;" @click="toCompanyDetail(detailValue.company.id)">
                    <div>
                        <div style="display: flex;align-items: center;">
                            <div>
                                <van-image width="3rem" height="3rem" fit="cover" position="left"
                                    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                            </div>
                            <div>
                                <van-cell>{{ detailValue?.company?.name }}</van-cell>
                                <van-cell>
                                    <van-rate color="#ffd21e" :value="detailValue?.company?.review?.score" />
                                    <span style="margin-right: 10px;">{{ detailValue?.company?.review?.score }}分</span>
                                    <span
                                        style="display: inline-block;border-left: 1px solid #ddd;padding-right: 2px;">{{
                                            detailValue?.company?.review?.count }}条点评</span>
                                </van-cell>
                            </div>
                        </div>
                        <div>
                            <van-icon name="location" />
                            <span style="display: inline-block; height: 1.5rem; overflow: hidden;">{{
                                detailValue?.company?.address }}</span>
                        </div>
                    </div>
                    <div>
                        <van-icon name="arrow" style="font-size: 24px;" />
                    </div>
                </div>
            </van-cell>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import router from '@/router';
import moment from 'moment';
import wogongApi from '@/api/index.js'
import { useRoute } from 'vue-router';

const route = useRoute()
const swipeRef = ref()
const detailValue = ref({})
const imgList = ref([])
const imgType = ref('')
const userId = localStorage.getItem('userId');
console.log(userId, 'userId')
const signature = route.query.signature
const job_id = route.query.job_id
onMounted(() => {
    getJobDetail()
})

const pageImg = () => {
    detailValue.value.environment.plant.forEach((item, index) => {
        getfileAllPATH(item).then(url => {
            imgList.value.push({
                url: url,
                type: 'plant',
                index: index
            })
        })

    });
    detailValue.value.environment.work.forEach((item, index) => {
        getfileAllPATH(item).then(url => {
            imgList.value.push({
                url: url,
                type: 'work',
                index: index
            })
        })
    });
    detailValue.value.environment.meal_room.forEach((item, index) => {
        getfileAllPATH(item).then(url => {
            imgList.value.push({
                url: url,
                type: 'meal_room',
                index: index
            })
        })
    });
    detailValue.value.environment.life.forEach((item, index) => {
        getfileAllPATH(item).then(url => {
            imgList.value.push({
                url: url,
                type: 'life',
                index: index
            })
        })
    });
    console.log(imgList.value, 'imgList')
};

const getJobDetail = () => {
    const params = {
        user_id: userId,
        // signature: signature
    }
    wogongApi.getJobDetail(job_id, params).then((res) => {
        console.log()
        detailValue.value = Object.assign({}, res)
        pageImg()
        wogongApi.postRecruitJob(job_id).then(data => {
            console.log(data)
        })
    })
}
const setTabActive = (index) => {
    imgType.value = imgList.value[index].type
}
const setTypeTab = (type) => {
    const index = imgList.value.findIndex(item => {
        return item.type == type
    })
    if (index) {
        swipeRef.value.swipeTo(index)
    } else {
        swipeRef.value.swipeTo(0)
    }
    console.log(index, 'index')
}
const goback = () => {
    router.go(-1)
}
const formatter = (date) => {
    return date? moment(date).format('YYYY-MM-DD') : ''
}
// 获取图片地址
const getfileAllPATH = (path) => {
    return new Promise((resolve, rejects) => {
        const params = {
            file_path: path
        }
        wogongApi.getfileAllPATH(params).then(res => {
            resolve(res.sign_url)
        })
    })

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

    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        height: 17rem;
        // background-color: #39a9ed;
    }

    :root {
        --van-nav-bar-background: #55726f;
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
        font-size: 1.5rem;
        position: absolute;
        top: 1rem;
        color: #fff;
        left: 0.5rem;
    }
}
</style>
