<template>
    <div class="home">
        <!-- <van-nav-bar>
            <template #right>
                <van-icon name="search" size="18" @click="searchList" />
            </template>
</van-nav-bar> -->
        <van-search v-model="searchValue" show-action placeholder="搜索">
            <template #action>
                <div @click="onClickButton">搜索</div>
            </template>
        </van-search>
        <van-dropdown-menu>
            <van-dropdown-item :title="areaTitle" ref="areaRef">
                <van-tree-select v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="treeData"
                    @click-item="changeCity" @click-nav="changeProvince" />
                <div>
                    <van-button type="default" style="width: 50%;border-radius: 0;"
                        @click="resetAreaForm">重置</van-button>
                    <van-button style="width: 50%;border-radius: 0; background-color: #2ee3d0; color: #fff;" @click="onConfirm">确定</van-button>
                </div>
            </van-dropdown-item>
            <van-dropdown-item v-model="value2" :options="option2" @change="changeSort" />
            <van-dropdown-item :title="'筛选'+ (changeNum == 0 ? '': changeNum)" ref="filterRef" style="height: 100%;">
                <van-cell class="tag-label">
                    <span>职位类型:</span>
                    <span>{{ searchFormRef.post_type == null ? '全部' : areaOption.workPayTypeOption[searchFormRef.post_type].label }}</span>
                </van-cell>
                <van-cell class="tag-value">
                    <span v-for="item in areaOption.workPayTypeOption" :key="item.value"
                        :class="searchFormRef.post_type == item.value ? 'isActive' : ''"
                        @click="changeValue(item, 'post_type')">
                        {{ item.label }} </span>
                </van-cell>
                <van-cell class="tag-label">
                    <span>年龄:</span>
                    <span>{{ searchFormRef.age_option == null ? '全部' : areaOption.ageOptions[searchFormRef.age_option].label }}</span>
                </van-cell>
                <van-cell class="tag-value">
                    <span v-for="item in areaOption.ageOptions" :key="item.value"
                        :class="searchFormRef.age_option == item.value ? 'isActive' : ''"
                        @click="changeValue(item, 'age_option')"> {{ item.label }} </span>
                </van-cell>
                <van-cell class="tag-label">
                    <span>学历要求:</span>
                    <span v-if="searchFormRef.education == 0"> 学历不限 </span>
                    <span v-else>{{ searchFormRef.education == null ? '全部' : areaOption.education[searchFormRef.education + 1].label}}</span>
                </van-cell>
                <van-cell class="tag-value">
                    <span v-for="item in areaOption.education" :key="item.value"
                        :class="searchFormRef.education == item.value ? 'isActive' : ''"
                        @click="changeValue(item, 'education')">
                        {{ item.label }} </span>
                </van-cell>
                <van-cell class="tag-label">
                    <span>职位福利:</span>
                    <span>{{ searchFormRef.job_benefits == null ? '全部' : areaOption.benefitsOptions[searchFormRef.job_benefits].label }}</span>
                </van-cell>
                <van-cell class="tag-value">
                    <span v-for="item in areaOption.benefitsOptions" :key="item.value"
                        :class="searchFormRef.job_benefits == item.value ? 'isActive' : ''"
                        @click="changeValue(item, 'job_benefits')"> {{ item.label }} </span>
                </van-cell>
                <div>
                    <van-button type="default" style="width: 50%;border-radius: 0;"
                        @click="resetFilterForm">重置</van-button>
                    <van-button style="width: 50%;border-radius: 0;background-color: #2ee3d0; color: #fff;" @click="onConfirm">确定</van-button>
                </div>
            </van-dropdown-item>
        </van-dropdown-menu>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group class="list-item" v-for="item in listAll" :key="item.job_id" @click="toDetail(item)">
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
                    <van-tag round type="primary" style="color: #999999;" color="#f5f5f5"
                        v-for="(tagItem, index) in item.tags" :key="index">{{ tagItem }}</van-tag>
                </van-cell>
                <van-cell value-class="job-from">
                    <van-row>
                        <van-col span="16" class="from-company">
                            <span style="display: flex;">
                                <van-image width="28" height="28" radius="5" :src="item.company.logo" />
                            </span>
                            <span style="margin-left: 5px;" class="company-name">{{ item.company.name }}</span>
                        </van-col>
                        <van-col span="8" class="date-adress">
                            <span style="margin-right: 8px; font-size: 0.8rem;">{{ item.company.base }}</span>
                            <!-- <span style="font-size: 0.8rem">07-06</span> -->
                        </van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { showToast } from 'vant';
import areaOption from '@/util/areaOption.js'
import wogongApi from '@/api/index.js'

const route = useRoute()
const searchValue = ref('')
const listAll = ref([]);
const loading = ref(false);
const finished = ref(false);
const showSearch = ref(false)
const activeId = ref(1);
const activeIndex = ref(0);
const value2 = ref('a');
const areaRef = ref()
const filterRef = ref()
const searchFormRef = ref({
    ethnicity: null,
    post_type: null,
    age_option: null,
    education: null,
    job_benefits: null
})
const changeNum = ref(0)
const treeData = areaOption.areaOption;
const option2 = [
    { text: '排序', value: 'a' },
    { text: '工资高低排序', value: 'b' },
    // { text: '返费高低排序', value: 'c' },
];
const userId = ref('')
const signature = ref('')
const page = ref(1)
const areaTitle = ref('全国')
const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    const params = {
        page: page.value++,
        page_size: 10,
        signature: signature.value,
        ...searchFormRef.value
    }
    console.log(params, 'params')
    wogongApi.getJobList(userId.value, params).then(res => {
        listAll.value = [...listAll.value, ...res.list]
        listAll.value.forEach(item => {
            getfileAllPATH(item.company.logo).then(url => {
                item.company.logo = url
            })
        })
        loading.value = false;
        if (listAll.value.length >= res.total) {
            finished.value = true;
        }
    })
};
const toDetail = (item) => {
    const query = {
        ...item.detail_param,
        job_id: item.job_id
    }
    router.push({ name: 'detail', query: query });
}

const onClickButton = () => {
    searchFormRef.value['keyword'] = searchValue.value
    onConfirm()
}
// 获取省市
const changeCity = (event) => {
    searchFormRef.value['city'] = event.text
    areaTitle.value = event.text
    treeData.forEach(item => {
        if (item.id == event.parent_id) {
            searchFormRef.value['province'] = item.text
        }
    })
}
const changeProvince = (event) => {
    console.log(event, 'changeProvince')
    treeData.forEach(item => {
        if (item.id == event) {
            searchFormRef.value['province'] = item.text
            if (item.text == '全国') {
                searchFormRef.value['province'] = ''
            }
            areaTitle.value = item.text
        }
    })
}
// 获取筛选参数
const changeValue = (item, type) => {
    searchFormRef.value[type] = item.value
    // changeNum
    changeNum.value = 0
    for (const key in searchFormRef.value) {
        if (searchFormRef.value[key] != null) {
            changeNum.value ++
        }
    }
}
const onConfirm = () => {
    areaRef.value.toggle(false);
    filterRef.value.toggle(false);
    page.value = 1
    listAll.value = []
    onLoad()
}
const resetFilterForm = () => {
    filterRef.value.toggle(false);
    for (const key in searchFormRef.value) {
        if (key != 'province' && key != 'city') {
            searchFormRef.value[key] = null
        }
    }
    page.value = 1
    listAll.value = []
    changeNum.value = 0
    onLoad()
}
const resetAreaForm = () => {
    areaRef.value.toggle(false);
    searchFormRef.value.province = ''
    searchFormRef.value.city = ''
    areaTitle.value = '全国'
    page.value = 1
    listAll.value = []
    onLoad()
}
const changeSort = (event) => {
    page.value = 1
    listAll.value = []
    if (event == 'a') {
        searchFormRef.value['sort_rule[type]'] = 1
        searchFormRef.value['sort_rule[order]'] = 'desc'
    } else if (event == 'b') {
        searchFormRef.value['sort_rule[type]'] = 2
        searchFormRef.value['sort_rule[order]'] = 'desc'
    } else if (event == 'c') {
        searchFormRef.value['sort_rule[type]'] = 3
        searchFormRef.value['sort_rule[order]'] = 'asc'
    }
    onLoad()
}
onMounted(() => {
    // const url = location.href
    const url = 'https://test-h5.dydwgw.com/?user_id=99&signature=b6a6ea8ac1bdad1301d5b649f7b1ca0b71beb3825579851789b8f25bce989db4#/home'
    const urlList = url.split('user_id=')[1].split('&signature=')
    userId.value = urlList[0]
    signature.value = urlList[1].split('#/home')[0]
    console.log(userId.value, 'userId')
    localStorage.setItem('userId', userId.value);
    console.log(signature.value, 'signature')
})

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
.job-info {
    padding-top: 0.5rem;
}

.job-filter {
    text-align: left;
}

.job-from {
    padding-top: 8px;
    border-top: 1px solid #f8f8f8;

    .from-company,
    .date-adress {
        display: flex;
        align-items: center;
    }

    .date-adress {
        justify-content: end;
        color: #A09DB9 !important;
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
    justify-content: flex-start;

    >.van-tag {
        padding: 2px 5px;
        margin-right: 10px;
    }

    >.van-tag:last-child {
        margin-right: 0;
    }
}

.job-name {
    text-align: left;
    font-size: 1rem;
    color: #000;
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
        display: inline-block;
        border: 1px solid #2ee3d0;
        border-radius: 0 5px 5px 0;
        padding: 0 3px;
        font-size: 0.8rem;
        color: #2ee3d0;
        width: 4rem;
        text-align: center;
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
    color: #888888 !important;
}

input::placeholder {
    // color: #888888 !important;
}

.van-search__content {
    border-radius: 10px;
    background-color: #EDEDED !important;
    color: #888888;
}

.tag-label {
    .van-cell__value {
        text-align: left;

        >span:last-child {
            margin-left: 6px;
            color: #2ee3d0;
        }
    }
}

.tag-value {
    padding-top: 0;
    padding-right: 0;
    .van-cell__value {
        text-align: left;
        display: flex;
        flex-wrap: wrap;

        >span {
            display: inline-block;
            padding: 2px 4px;
            border: 1px solid #ececec;
            border-radius: 2px;
            margin: 2px 3px;
            width: 5rem;
            text-align: center;
        }
    }
}

.isActive {
    background-color: #2ee3d0;
    color: #fff;
}

// .van-sidebar-item {
// 	color: #A09DB9 !important;
// }
// .van-tree-select__item {
//     color: #A09DB9 !important;
// }</style>
