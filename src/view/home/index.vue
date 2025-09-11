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
            <van-dropdown-item title="全国" ref="itemRef">
                <van-tree-select
                  v-model:active-id="activeId"
                  v-model:main-active-index="activeIndex"
                  :items="treeData"
                  @click-item="changeCity"
                />
               <div>
                 <van-button type="default" style="width: 50%;border-radius: 0;" @click="itemRef.toggle();">重置</van-button>
                 <van-button type="primary" style="width: 50%;border-radius: 0;" @click="onConfirm">确定</van-button>
               </div>
            </van-dropdown-item>
            <van-dropdown-item v-model="value2" :options="option2" />
            <van-dropdown-item title="筛选">
                 <van-cell class="tag-label">
                    <span>职位类型:</span>
                    <span>全部</span>
                 </van-cell>
                 <van-cell class="tag-value">
                    <span v-for="item in areaOption.workPayTypeOption" :key="item.value" :class="searchFormRef.post_type == item.value ? 'isActive': ''" @click="changeValue(item, 'post_type')"> {{ item.label }} </span>
                 </van-cell>
                 <!-- <van-cell class="tag-label">
                    <span>民族:</span>
                    <span>全部</span>
                 </van-cell>
                 <van-cell class="tag-value">
                    <span v-for="item in areaOption.ethnicity" :key="item.value" :class="searchFormRef.ethnicity == item.value ? 'isActive': ''" @click="changeValue(item, 'ethnicity')"> {{ item.label }} </span>
                 </van-cell> -->
                 <van-cell class="tag-label">
                    <span>年龄:</span>
                    <span>全部</span>
                 </van-cell>
                 <van-cell class="tag-value">
                    <span v-for="item in areaOption.ageOptions" :key="item.value" :class="searchFormRef.age_option == item.value ? 'isActive': ''" @click="changeValue(item, 'age_option')"> {{ item.label }} </span>
                 </van-cell>
                 <van-cell class="tag-label">
                    <span>学历要求:</span>
                    <span>全部</span>
                 </van-cell>
                 <van-cell class="tag-value">
                    <span v-for="item in areaOption.education" :key="item.value" :class="searchFormRef.education == item.value ? 'isActive': ''" @click="changeValue(item, 'education')"> {{ item.label }} </span>
                 </van-cell>
                  <van-cell class="tag-label">
                    <span>职位福利:</span>
                    <span>全部</span>
                 </van-cell>
                 <van-cell class="tag-value">
                    <span v-for="item in areaOption.benefitsOptions" :key="item.value" :class="searchFormRef.job_benefits == item.value ? 'isActive': ''" @click="changeValue(item, 'job_benefits')"> {{ item.label }} </span>
                 </van-cell>
                 <div>
                 <van-button type="default" style="width: 50%;border-radius: 0;">重置</van-button>
                 <van-button type="primary" style="width: 50%;border-radius: 0;" @click="onConfirm">确定</van-button>
               </div>
            </van-dropdown-item>
        </van-dropdown-menu>
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad">
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
                    <van-tag round type="primary" style="color: #999999;" color="#f5f5f5" v-for="(tagItem, index) in item.tags" :key="index">{{ tagItem }}</van-tag>
                </van-cell>
                <van-cell value-class="job-from">
                    <van-row>
                        <van-col span="16" class="from-company">
                            <span style="display: flex;">
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
import { ref, reactive, onMounted } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { showToast } from 'vant';
import areaOption from '@/util/areaOption.js'
import wogongApi from '@/api/index.js'

const route = useRoute()
const listAll = ref([]);
const loading = ref(false);
const finished = ref(false);
const showSearch = ref(false)
const activeId = ref(1);
const activeIndex = ref(0);
const value2 = ref('a');
const itemRef = ref()
const searchFormRef = ref({
    ethnicity: null,
    post_type: null,
    age_option: null,
    education: null,
    job_benefits: null
})
const treeData = areaOption.areaOption;
const option2 = [
    { text: '排序', value: 'a' },
    { text: '工资高低排序', value: 'b' },
    { text: '返费高低排序', value: 'c' },
];
const userId = ref('')
const signature = ref('')
const page = ref(1)
const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    const params = {
        page: page.value ++,
        page_size: 10,
        signature: signature.value
    }
    wogongApi.getJobList(userId.value, params).then(res => {
        listAll.value = [...listAll.value, ...res.list]
        loading.value = false;
        console.log(listAll.value)
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
   router.push({name: 'detail', query: query});
}
const searchList = () => {
    showSearch.value = true
}
// 获取省市
const changeCity = (event) => {
    
}
// 获取筛选参数
const changeValue = (item, type)=> {
    searchFormRef.value[type] = item.value
}
const onConfirm = () => {
    itemRef.value.toggle();
}

onMounted(() => {
    // const url = location.href
    const url = 'https://test-h5.dydwgw.com/?user_id=59&signature=4f1035c395308447c112d975202553ed6adb205d1e0f26514baee73261001925#/home'
    const urlList = url.split('user_id=')[1].split('&signature=')
    userId.value = urlList[0]
    signature.value = urlList[1].split('#/home')[0]
    console.log(userId.value, 'userId')
    localStorage.setItem('userId', userId.value);
    console.log(signature.value, 'signature')
})

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
    .van-cell__value {
        text-align: left;
        display: flex;
        flex-wrap: wrap ;
        >span {
            display: inline-block;
            padding: 2px 5px;
            border: 1px solid #ececec;
            border-radius: 2px;
            margin: 2px 5px;
            width: 4rem;
            text-align: center;
        }
    }
}
.isActive {
    background-color: #2ee3d0;
    color: #fff;
}
</style>
