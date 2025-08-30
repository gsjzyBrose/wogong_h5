<template>
    <div class="home">
        <van-nav-bar v-if="!showSearch">
            <template #right>
                <van-icon name="search" size="18" @click="searchList" />
            </template>
        </van-nav-bar>
        <van-search
          background="#2ee3d0"
          show-action
          placeholder="搜索"
          v-if="showSearch"
        />
        <van-dropdown-menu>
            <van-dropdown-item title="全国">
                <van-tree-select
                  v-model:active-id="activeId"
                  v-model:main-active-index="activeIndex"
                  :items="items"
                  :field-names="customFieldNames"
                />
            </van-dropdown-item>
            <van-dropdown-item v-model="value2" :options="option2" />
            <van-dropdown-item v-model="value3" :options="option3" />
        </van-dropdown-menu>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group class="list-item" v-for="item in listAll" :key="item.job_id" @click="toDetail()">
                <van-cell value-class="job-info">
                    <van-row>
                        <van-col span="12" class="job-name">{{ item.job_name }}</van-col>
                        <van-col span="12" class="info-right">
                            <span>{{ item.salary.label }}</span>
                            <span>{{ item.salary.desc }}</span>
                        </van-col>
                    </van-row>
                </van-cell>
                <van-cell value-class="job-money">
                    <van-row>
                        <van-col span="16" class="job-filter">
                            <span style="margin-right: 16px;">{{ item.age_scale }}</span>
                            <span>{{ item.education }}</span>
                        </van-col>
                        <van-col span="8"> {{ item.salary.scale }} </van-col>
                    </van-row>
                </van-cell>
                <van-cell value-class="job-tab">
                    <van-tag round type="primary" style="color: #999999;" color="#f5f5f5" v-for="(tagItem, index) in item.tags" :key="index">{{ tagItem }}</van-tag>
                </van-cell>
                <van-cell value-class="job-from">
                    <van-row>
                        <van-col span="16" class="from-company">
                            <span>
                                <van-image width="28" height="28" radius="5"
                                    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                            </span>
                            <span style="margin-left: 5px;" class="company-name">{{ item.company.name }}</span>
                        </van-col>
                        <van-col span="8" class="date-adress">
                            <span style="margin-right: 8px; font-size: 0.8rem;">{{ item.company.base }}</span>
                            <span style="font-size: 0.8rem">07-06</span>
                        </van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import router from '@/router';
import { showToast } from 'vant';
import areaOption from '@/util/areaOption'


const listAll = ref([]);
const loading = ref(false);
const finished = ref(false);
const showSearch = ref(false)

const value1 = ref(0);
const value2 = ref('a');
const value3 = ref('a');
const activeId = ref(1);
const activeIndex = ref(0);
// 自定义字段映射，将 text 映射到 name
const customFieldNames = {
  text: 'name', // 关键配置：使用 name 作为显示文本
  children: 'children', // 子节点字段保持默认
  value: 'id' // value 字段映射到 id
};
const items = [
      {
        name: '浙江',
        children: [
          { name: '杭州', id: 1 },
          { name: '温州', id: 2 },
          { name: '宁波', id: 3, disabled: true },
        ],
      },
      {
        name: '江苏',
        children: [
          { name: '南京', id: 4 },
          { name: '无锡', id: 5 },
          { name: '徐州', id: 6 },
        ],
      },
      { name: '福建', disabled: true },
    ];
const option1 = [
    { text: '全部商品', value: 0 },
    { text: '新款商品', value: 1 },
    { text: '活动商品', value: 2 },
];
const option2 = [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' },
];
const option3 = [
    { text: '默认排序', value: 'a' },
    { text: '好评排序', value: 'b' },
    { text: '销量排序', value: 'c' },
];

const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
        listAll.value = reactive([
            {
                job_id: 71,
                job_name: "勿动测试",
                age_scale: "16-35周岁",
                education: "学历不限",
                tags: [
                    "清真食堂",
                    "厂车接送"
                ],
                salary: {
                    label: "日薪",
                    desc: "200元/天",
                    scale: "6000-8000元/月"
                },
                company: {
                    id: 12,
                    name: "西安安泰测试设备有限公司",
                    logo: "company/logo/normal/1756435812935775425624887.jpg",
                    base: "陕西·西安市"
                },
                created_at: "08-29"
            },
            {
                job_id: 54,
                job_name: "普工",
                age_scale: "16-35周岁",
                education: "学历不限",
                tags: [
                    "包吃包住"
                ],
                salary: {
                    label: "底薪",
                    desc: "2585元/月",
                    scale: "8988-56888元/月"
                },
                company: {
                    id: 1,
                    name: "兰州德与德网络技术有限公司",
                    logo: "certification/company/00000001/1752131414437758781732746.png",
                    base: "甘肃·兰州"
                },
                created_at: "08-29"
            },
            {
                job_id: 53,
                job_name: "达昊小时工",
                age_scale: "18-40周岁",
                education: "学历不限",
                tags: [
                    "五险一金",
                    "穿静电衣",
                    "两班倒"
                ],
                salary: {
                    label: "工价",
                    desc: "25元/小时",
                    scale: "5500-7000元/月"
                },
                company: {
                    id: 10,
                    name: "达昊（厦门）制造有限公司",
                    logo: "company/logo/normal/1756364302140079781755521.jpg",
                    base: "福建·厦门市"
                },
                created_at: "08-29"
            },
            {
                job_id: 51,
                job_name: "群创小时工",
                age_scale: "18-45周岁",
                education: "学历不限",
                tags: [
                    "清真食堂",
                    "穿无尘衣",
                    "两班倒"
                ],
                salary: {
                    label: "工价",
                    desc: "24元/小时",
                    scale: "5500-7500元/月"
                },
                company: {
                    id: 8,
                    name: "宁波群志光电有限公司",
                    logo: "company/logo/normal/1756279730925771159380583.jpg",
                    base: "浙江·宁波市"
                },
                created_at: "08-29"
            },
            {
                job_id: 50,
                job_name: "测试停招",
                age_scale: "16-38周岁",
                education: "学历不限",
                tags: [
                    "五险一金"
                ],
                salary: {
                    label: "日薪",
                    desc: "150元/天",
                    scale: "4000-6000元/月"
                },
                company: {
                    id: 5,
                    name: "检科测试集团有限公司",
                    logo: "company/logo/normal/1755658425276096673723813.jpg",
                    base: "北京·北京市"
                },
                created_at: "08-29"
            }])
    }, 1000);
};
const toDetail = () => { 
   router.push('detail');
}
const searchList = () => {
    showSearch.value = true
}
</script>

<style lang="scss">
.job-info {
    padding-top: 0.5rem;
}
.job-filter {
    text-align: left;
}

.job-from {
    padding-top: 8px;
    padding-bottom: 8px;
    border-top: 1px solid #f8f8f8;

    .from-company,
    .date-adress {
        display: flex;
        align-items: center;
    }

    .date-adress {
        justify-content: end;
    }
}

.list-item {
    border-top: 4px solid #f6f7fa;

    >.van-cell {
        padding: 4px 16px;
    }
}

.job-tab {
    display: flex;
    justify-content:flex-start;
    >.van-tag {
        padding: 2px 5px;
        margin-right: 10px;
    }
    >.van-tag:last-child{
        margin-right: 0;
    }
}

.job-name {
    text-align: left;
    font-size: 1rem;
    color: #000;
}

.info-right {
    font-size: 0.8rem;
    border-radius: 10px;

    >span:first-child {
        background-color: #2ee3d0;
        color: #fff;
        padding: 4px;
        font-size: 0.6rem;
        border-radius: 5px 0 0 5px;
    }

    >span:last-child {
        border: 1px solid #2ee3d0;
        border-radius: 0 5px 5px 0;
        padding: 3px;
        font-size: 0.6rem;
        color: #2ee3d0;
    }
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
.company-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgb(136, 136, 136);
}
.van-search__action {
    color: #fff;
}
.van-search__content {
    border-radius: 10px;
}
</style>
