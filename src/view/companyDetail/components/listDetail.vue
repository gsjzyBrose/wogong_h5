<template>
    <div class="detail">
        <div>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>1</van-swipe-item>
                <van-swipe-item>2</van-swipe-item>
                <van-swipe-item>3</van-swipe-item>
                <van-swipe-item>4</van-swipe-item>
            </van-swipe>
        </div>
        <div class="detail-card">
            <van-cell value-class="job-info">
                <van-row style="padding-top: 8px;">
                    <van-col span="12" class="job-name">{{ detailValue.base_info.title }}</van-col>
                    <van-col span="12" style="text-align: right;">
                        <span>刷新时间: {{ detailValue.base_info.updated_at }}</span>
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
                <div style="display: flex;justify-content: space-between;align-items: center;">
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
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue';
import router from '@/router';

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
const toCompanyDetail = () => {
    router.push('companyDetail');
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
</style>
