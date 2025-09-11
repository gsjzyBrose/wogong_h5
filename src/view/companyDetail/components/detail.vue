<template>
    <div class="detail">
        <div class="detail-card">
            <van-cell>
                <h3 class="detail-title">基本信息</h3>
            </van-cell>
            <van-cell>
                <span>企业类型: </span>
                <span>{{ props.detailValue?.base_info?.type }}</span>
            </van-cell>
            <van-cell>
                <span>行业: </span>
                <span>{{ props.detailValue?.base_info?.industry }}</span>
            </van-cell>
            <van-cell>
                <span>企业规模: </span>
                <span>{{ props.detailValue?.base_info?.scale }}</span>
            </van-cell>
            <van-cell style="padding-bottom: 10px;">
                <span>企业地址: </span>
                <span style="height: 1.5rem;display: inline-block;overflow: hidden;">{{ props.detailValue?.base_info?.address.toString() }}</span>
            </van-cell>
        </div>
        <div class="detail-card">
            <van-cell>
                <h3 class="detail-title">经营范围</h3>
            </van-cell>
            <van-cell style="padding-bottom: 10px; height: 8rem;" class="salary-intoduce">
                <span class="intoduce-content" ref="intoduceElement">
                    {{ props.detailValue?.business_scope }}
                </span>
            </van-cell>
            <div v-show="showAllIntoduce">
                <van-cell class="push-icon" v-if="!showIntoduce" style="padding-bottom: 10px;" @click="pushIntoduce">
                    <span>展开</span>
                    <span>
                        <van-icon name="play" style="transform:rotate(90deg)" />
                    </span>
                </van-cell>
                <van-cell class="push-icon" v-else style="padding-bottom: 10px;" @click="packupIntoduce">
                    <span>收起</span>
                    <span>
                        <van-icon name="play" style="transform:rotate(-90deg)" />
                    </span>
                </van-cell>
            </div>
        </div>
        <div class="detail-card">
            <van-cell>
                <h3 class="detail-title">企业介绍</h3>
            </van-cell>
            <van-cell style="padding-bottom: 10px; height: 8rem;"  class="accommoda-box">
                <span class="accommoda-content" ref="accommodaElement">
                    {{ props.detailValue?.introduce }}
                </span>
            </van-cell>
            <div v-show="showAllAccommoda">
                <van-cell class="push-icon" v-if="!showAccommoda" style="padding-bottom: 10px;" @click="pushAccommoda">
                    <span>展开</span>
                    <span>
                        <van-icon name="play" style="transform:rotate(90deg)" />
                    </span>
                </van-cell>
                <van-cell class="push-icon" v-else style="padding-bottom: 10px;" @click="packUpAccommoda">
                    <span>收起</span>
                    <span>
                        <van-icon name="play" style="transform:rotate(-90deg)" />
                    </span>
                </van-cell>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount, onMounted, onBeforeUnmount, nextTick } from 'vue';
import router from '@/router';
const detailValue = ref()
const showIntoduce = ref(false)
const showAccommoda = ref(false)
const showAllIntoduce = ref(true) //是否展示经营范围下拉
const showAllAccommoda = ref(true) //是否展示公司介绍下拉
// 获取DOM元素的ref
const intoduceElement = ref(null);
const accommodaElement = ref(null);
// 存储ResizeObserver实例
let resizeObserver = null;

const props = defineProps({
    detailValue: {
        type: Object,
        default: {}
    }
})

onBeforeMount(() => {
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
};
const pushIntoduce = () => {
    showIntoduce.value = true
    const element = document.querySelectorAll('.salary-intoduce')[0]
    element.style.height = 'auto'
    element.style.overflow = 'unset'
}
const packupIntoduce = () => {
    showIntoduce.value = false
    const element = document.querySelectorAll('.salary-intoduce')[0]
    element.style.height = '8rem'
    element.style.overflow = 'hidden'
}
const pushAccommoda = () => {
    showAccommoda.value = true
}
const packUpAccommoda = () => {
    showAccommoda.value = false
}

onMounted(() => {
    // 获取根元素的字体大小
    const rootFontSize = window.getComputedStyle(document.documentElement).fontSize;
    // 将字体大小转换为数字（例如，如果字体大小是"16px"，则转换为16）
    const fontSize = parseFloat(rootFontSize)
    nextTick(() => {
        // 创建ResizeObserver实例
        resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                // 获取元素高度
                const height = entry.contentRect.height;
                // console.log('元素高度变化为:', height);
                // 在这里可以处理高度变化的逻辑
                if (height < 8 * fontSize) {
                    if (entry.target.className == 'intoduce-content') {
                        showAllIntoduce.value = false
                    }
                    if (entry.target.className == 'accommoda-content') {
                        showAllAccommoda.value = false
                    }
                } else {
                    if (entry.target.className == 'intoduce-content') {
                        showAllIntoduce.value = true
                    }
                    if (entry.target.className == 'accommoda-content') {
                        showAllAccommoda.value = true
                    }
                }
            }
        });
        // 开始监听目标元素
        if (intoduceElement.value) {
            resizeObserver.observe(intoduceElement.value);
        }
        if (accommodaElement.value) {
            resizeObserver.observe(accommodaElement.value);
        }
    })

});
onBeforeUnmount(() => {
    // 组件卸载时停止监听，防止内存泄漏
    if (resizeObserver) {
        resizeObserver.unobserve(intoduceElement.value);
        resizeObserver.unobserve(accommodaElement.value);
    }
});
</script>

<style lang="scss">
.detail {
    background-color: #f5f5f5;
    height: 100%;

    .detail-card {
        margin: 10px 8px;
        border-radius: 10px;
        overflow: hidden;
        background-color: #fff;

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

    .push-icon {
        .van-cell__value {
            text-align: center;
            color: #2ee3d0;
        }
    }
}
</style>