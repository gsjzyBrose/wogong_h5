<template>
    <van-cell class="company-info">
        <div>
            <div style="display: flex;align-items: center;">
                <div style="margin-right: 10px;">
                    <van-image width="3rem" height="3rem" fit="cover" position="left"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                </div>
                <div>
                    <div>{{ detailValue.company.name }}</div>
                    <div>
                        <van-rate color="#ffd21e" v-model="detailValue.company.review.score" readonly />
                        <span style="margin-right: 10px;">{{ detailValue.company.review.score }}分</span>
                        <span style="display: inline-block;border-left: 1px solid #fff;padding-left: 2px;">
                            {{ detailValue.company.review.count }}条点评</span>
                    </div>
                </div>
            </div>
        </div>
    </van-cell>
    <van-tabs v-model:active="active" class="company-tab">
        <van-tab title="企业简介">
            <detail ref="detailRef" />
        </van-tab>
        <van-tab title="招聘职位">
            <list ref="listRef" />
        </van-tab>
    </van-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue';
import router from '@/router';
import detail from './components/detail.vue';
import list from './components/list.vue';
const detailRef = ref()
const listRef = ref()
const active = ref(0);
const value = ref(3);
const detailValue = ref()

onBeforeMount(() => {
    console.log('11111111111111111')
    onLoad()
})

const onLoad = () => {
    detailValue.value = {
        environment: {
            plant: [
                "company/environment/00000017/1756694476067-微信图片_20250901102221.jpg"
            ],
            work: [
                "company/environment/00000017/1756694500553-微信图片_20250901102214.jpg"
            ],
            meal_room: [
                "company/environment/00000017/1756694514362-微信图片_20250901102111.jpg",
                "company/environment/00000017/1756694520551-微信图片_20250901102118.jpg"
            ],
            life: []
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
    console.log(detailValue.value)
};
const ToCompanyDetail = () => {
    router.push('detail');
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
}
.company-info {
    background:url('./../../assets/company-bgi.png') no-repeat fixed top;
    height: 11rem;
    >.van-cell__value {
        display: flex;
        align-items: center;
    }
    .van-cell__value {
        text-align: left;
        color: #fff !important;
    }
    .van-cell {
        background: unset;
    }
    .van-cell:after {
        display: none;
    }
    
}
.company-tab {
    .van-tabs__line {
        width: 50% !important;
        background: #2ee3d0 !important;
    }
    .van-tab__text--ellipsis {
        font-size: 1.1rem;
    }
}
</style>
