<template>
    <van-cell class="company-info">
        <div>
            <div style="display: flex;align-items: center;padding-left: 1rem;">
                <div style="margin-right: 10px;">
                    <van-image width="3.5rem" height="3.5rem" fit="cover" position="left" radius="10"
                        :src="detailValue?.logo"  />
                </div>
                <div>
                    <div style="margin-bottom: 5px; font-size: 1rem;">{{ detailValue?.name }}</div>
                    <div style="height: 1.5rem;
                               width: 15rem;
                               overflow: hidden;
                               text-overflow: ellipsis;
                               white-space: nowrap;">
                     <van-icon name="location" />
                     <span style="overflow: hidden;">{{ detailValue?.base_info?.address.toString() }}</span>
                        <!-- <van-rate color="#ffd21e" :value="detailValue?.review?.score" readonly />
                        <span style="margin-right: 10px;">{{ detailValue?.company?.review?.score }}分</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="go-back" @click="goback">
            <van-icon name="arrow-left" />
        </div>
    </van-cell>
    <van-tabs v-model:active="active" class="company-tab">
        <van-tab title="企业简介">
            <detail ref="detailRef"  :detailValue="detailValue" />
        </van-tab>
        <van-tab title="招聘职位">
            <list ref="listRef" :companyId="companyId"/>
        </van-tab>
    </van-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import detail from './components/detail.vue';
import list from './components/list.vue';
import wogongApi from '@/api/index.js'

const route = useRoute()
const detailRef = ref()
const listRef = ref()
const active = ref(0);
const value = ref(3);
const detailValue = ref()
const companyId = route.query.id
onBeforeMount(() => {
    window.scrollTo(0,0)
    getCompanyDetail()
})

const goback = () => {
  router.go(-1)
}
const getCompanyDetail = () => {
    wogongApi.getCompanyDetail(companyId).then(res => {
        detailValue.value = res
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
.go-back {
    font-size: 1.5rem;
    position: absolute;
    top: 1rem;
    color: #fff;
    left: 0.5rem;
}
</style>
