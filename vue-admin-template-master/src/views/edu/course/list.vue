<template>
    <div class="app-container">

   <!--查询表单-->
   <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option :value="Normal" label="已发布"/>
          <el-option :value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="courseQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="courseQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

         <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      row-class-name="myClassList">>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" width="300" />

      <el-table-column label="课程状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'已发布':'未发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" width="120" />
      <el-table-column prop="price" label="课时价格"  width="120"/>


      <el-table-column prop="gmtCreate" label="添加时间" width="200"/>

      <el-table-column prop="viewCount" label="浏览数量" width="120" />

      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">

          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>

          <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除课程信息</el-button>
        </template>
      </el-table-column>
    </el-table>

       <!-- 分页 -->
       <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

    </div>
</template>
<script>
//引入调用course.js文件
import course from '@/api/edu/course'

export default {
    //写核心代码位置
    // data:{    
    // },
    data(){ //定义变量和初始值
        return {
            listLoading: false, // 是否显示loading信息
            list:null, //查询之后接口返回集合
            page:1,//当前页
            limit:5,//每页记录
            total:0, //总记录
            Normal:'Normal',
            Draft: 'Draft',
            courseId:'',
            courseQuery:{
                status:''
            } //条件封装对象
        }
    },
    created(){ //页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList()
    },
    methods:{ //创建具体的方法，调用course.js定义的方法
        //课程列表的方法
        getList(page=1){
            this.page=page
            course.pageCourseList(
                this.page,this.limit,this.courseQuery
            )
            .then(response =>{//请求成功
                //response 接口返回的数据
                // console.log(response)
                this.list=response.data.rows
                this.total=response.data.total
            })
            
        },
        resetData() {
            //表单输入项数据清空
            this.courseQuery = {}
            //查询所有讲师数据
             this.getList() 
        },
        //删除课程的方法
        removeDataById(id){
          this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {  //点确定
            //调用删除的方法
            course.removeCourseId(id).then(response=>{ //删除成功
                //提示信息
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
                //回到列表信息
                this.getList()
            })
        }).catch(() => {        
        }); 
        }   
    }
        
}
</script>
<style scoped>
.myClassList .info {
    width: 450px;
    overflow: hidden;
}
.myClassList .info .pic {
    width: 150px;
    height: 90px;
    overflow: hidden;
    float: left;
}
.myClassList .info .pic a {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.myClassList .info .pic img {
    display: block;
    width: 100%;
}
.myClassList td .info .title {
    width: 280px;
    float: right;
    height: 90px;
}
.myClassList td .info .title a {
    display: block;
    height: 48px;
    line-height: 24px;
    overflow: hidden;
    color: #00baf2;
    margin-bottom: 12px;
}
.myClassList td .info .title p {
    line-height: 20px;
    margin-top: 5px;
    color: #818181;
}
</style>