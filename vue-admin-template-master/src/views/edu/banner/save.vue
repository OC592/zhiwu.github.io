<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="Banner名称">
                <el-input v-model="banner.title" />
            </el-form-item>
            <el-form-item label="Banner排序">
                <el-input-number v-model="banner.sort" controls-position="right" :min="0" />
            </el-form-item>


            <!-- Banner轮播图 -->
            <el-form-item label="Banner轮播图">

                <!-- 头衔缩略图 -->
                <pan-thumb :image="String(banner.imageUrl)" />
                <!-- 文件上传按钮 -->
                <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow = true">更换Banner
                </el-button>

                    <!--
                    v-show：是否显示上传组件
                    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                    :url：后台上传的url地址
                    @close：关闭上传组件
                    @crop-upload-success：上传成功后的回调 
                    <input type="file" name="file"/>
                -->
                <image-cropper 
                    v-show="imagecropperShow" 
                    :width="1200" 
                    :height="480" 
                    :key="imagecropperKey"
                    :url="BASE_API + '/eduoss/fileoss'" 
                    field="file" 
                    @close="close"
                    @crop-upload-success="cropSuccess" />

            </el-form-item>


            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

import banner from '@/api/cms/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'


export default {
    components: { ImageCropper, PanThumb },
    data() {
        return {
            banner: {
                title: '',
                sort: 0,
                imageUrl:'',
            },
            imagecropperShow: false,
            imagecropperKey: 0, //上传组件key值
            BASE_API: process.env.BASE_API, //获取dev.env.js里面地址
            saveBtnDisabled: false,
        }
    },
    created() {
        this.init()
    },
    watch: { //监听
        $route(to, from) {//路由变化的方式,路由发生变化，方法就会被执行
            this.init()
        }
    },
    methods: {
        //关闭上传弹框的方法
        close(){
            this.imagecropperShow=false
            //上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
            this.imagecropperKey=this.imagecropperKey+1
        },
        //上传成功的回调方法
        cropSuccess(data){
            this.imagecropperShow=false
            //上传之后接口返回图片地址
            this.banner.imageUrl=data.url
            //上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
            this.imagecropperKey=this.imagecropperKey+1
        },

        init(){
            //判断路径是否有id值, 有id值做修改
            if (this.$route.params && this.$route.params.id) {
                //从路径获取id值
                const id = this.$route.params.id
                //调用根据id查询的方法
                this.getInfo(id)
            } else { //路径没有id值 做添加
                //清空表单
                this.banner = {
                }
            }
        },
        //根据bannerid查询方法
        getInfo(id) {
            banner.getBanner(id)
                .then(response => {
                    this.banner = response.data.banner
                })
        },
        //添加banner
        saveBanner(){
            banner.addBanner(this.banner)
                .then(response => { //添加成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '添加成功！'
                    });
                    //回到列表页面， 路由跳转
                    this.$router.push({ path: '/banner/list' })
                })
        },
        //修改banner
        updateBannerInfo(){
            banner.updateBannerInfo(this.banner)
            .then(response=>{
                        //提示信息
                        this.$message({
                        type: 'success',
                        message: '修改成功！'
                    });
                    //回到列表页面， 路由跳转
                    this.$router.push({ path: '/banner/list' })
            })
        },
        saveOrUpdate(){
            //判断是修改还是添加
            //根据banner是否有id
            if (!this.banner.id) {
                //添加
                this.saveBanner()
            } else {
                //修改
                this.updateBannerInfo()
            }
        },
    }
}
</script>
