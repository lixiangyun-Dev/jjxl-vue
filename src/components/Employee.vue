<template>
  <div>
    <div>
      <!-- 查询表单 -->
      <el-form
        :inline="true"
        :model="searchform"
        ref="searchform"
        class="demo-form-inline"
      >
        <el-form-item prop="name" label="姓名">
          <el-input
            style="width: 100px"
            v-model="searchform.name"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-select
            style="width: 80px"
            v-model="searchform.sex"
            placeholder="性别"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="entryDate" label="入职日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            style="width: 300px"
            v-model="searchform.entryDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button style="width: 80px" type="primary" @click="selectData"
            >查询</el-button
          >
          <el-button
            style="width: 80px"
            type="primary"
            @click="resetForm('searchform')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div>
      <!-- 新增与批量删除 -->
      <el-row>
        <el-button type="primary" @click="dialogVisible = true"
          >新增员工</el-button
        >
        <el-button type="danger" @click="removeRows">批量删除</el-button>
      </el-row>
      <el-dialog
        style="text-align: left"
        title="新增员工"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form
          style="text-align: left; width: 300px"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图像" prop="image">
            <!-- <el-input v-model="ruleForm.image"></el-input> -->
            <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="职位" prop="job">
            <el-select v-model="ruleForm.job" placeholder="职位">
              <el-option label="班主任" value="1"></el-option>
              <el-option label="讲师" value="2"></el-option>
              <el-option label="学工主管" value="3"></el-option>
              <el-option label="教研主管" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入职日期">
            <el-col :span="11">
              <el-form-item prop="entryDate">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="入职日期"
                  v-model="ruleForm.entryDate"
                  style="width: 220%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="所属部门" prop="deptId">
            <el-select v-model="ruleForm.deptId" placeholder="请选择所属部门">
              <el-option v-for="item in deptNameOptions" :value="item">
                {{ item }}
              </el-option>
              <!-- <el-option label="学工部" value="1"></el-option>
              <el-option label="教务部" value="2"></el-option> -->
            </el-select>
          </el-form-item>
        </el-form>
        <span style="text-align: center" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="insert('ruleForm')"
            >保 存</el-button
          >
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <!-- 批量删除 -->
    </div>
    <div>
      <!-- 显示数据表单 -->
      <el-table
        style="text-align: center"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
      >
        >
        <!-- 每条数据前面增加复选框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="image" label="图像" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.image" width="120px" height="80px" />
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="80">
          <template slot-scope="scope">
            <!-- {{ scope.row.sex == 1 ? "男" : "女" }} -->
            <span v-if="scope.row.sex === 1">男</span>
            <span v-else-if="scope.row.sex === 2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="job" label="职位" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.job === 1">班主任</span>
            <span v-else-if="scope.row.job === 2">讲师</span>
            <span v-else-if="scope.row.job === 3">学工主管</span>
            <span v-else-if="scope.row.job === 4">教研主管</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="entryDate"
          label="入职日期"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="最后操作日期"
          width="160"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-dialog
              style="text-align: left"
              title="编辑员工"
              :visible.sync="dialogUpdateVisible"
              width="30%"
              :before-close="handleUpdateClose"
            >
              <el-form
                style="text-align: left; width: 300px"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                class="demo-ruleForm"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input
                    :disabled="true"
                    v-model="ruleForm.username"
                  ></el-input>
                </el-form-item>
                <el-form-item label="员工姓名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-select v-model="ruleForm.sex" placeholder="性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="图像" prop="image">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="职位" prop="job">
                  <el-select v-model="ruleForm.job" placeholder="职位">
                    <el-option label="班主任" value="1"></el-option>
                    <el-option label="讲师" value="2"></el-option>
                    <el-option label="学工主管" value="3"></el-option>
                    <el-option label="教研主管" value="4"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="入职日期">
                  <el-col :span="11">
                    <el-form-item prop="entryDate">
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="入职日期"
                        v-model="ruleForm.entryDate"
                        style="width: 150%"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="所属部门" prop="deptId">
                  <el-select v-model="ruleForm.deptId" placeholder="所属部门">
                    <el-option v-for="item in deptNameOptions" :value="item">
                      {{ item }}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span
                style="text-align: center"
                slot="footer"
                class="dialog-footer"
              >
                <el-button type="primary" @click="update('ruleForm')"
                  >保 存</el-button
                >
                <el-button @click="handleUpdateClose()">取 消</el-button>
              </span>
            </el-dialog>
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />
    <div>
      <!-- 分页条 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "employee",
  data() {
    return {
      tableData: [],
      searchform: {
        name: "",
        sex: "",
        entryDate: [],
      },
      imageUrl: "",
      currentPage4: 1,
      pageSize: 10,
      total: 0,
      ids: [], // 批量选择中选择的记录列表
      dialogVisible: false,
      dialogUpdateVisible: false,
      ruleForm: {
        username: "",
        name: "",
        sex: "",
        image: "",
        job: "",
        entryDate: "",
        deptId: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      deptNameOptions: [],
    };
  },
  methods: {
    //查询、翻页
    selectData() {
      axios
        .get("/api/employee", {
          params: {
            page: this.currentPage4,
            pageSize: this.pageSize,
            name: this.searchform.name,
            sex: this.searchform.sex,
            begin: this.searchform.entryDate[0],
            end: this.searchform.entryDate[1],
          },
        })
        .then((res) => {
          this.tableData = res.data.data.rows;
          // console.log(this.searchform.entryDate);
          // this.tableData = res.data.data.rows;
          this.total = res.data.data.total;
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      console.log(`每页 ${pageSize} 条`);
      // this.loadData();
      this.selectData();
    },
    handleCurrentChange(pageNum) {
      this.currentPage4 = pageNum;
      console.log(`当前页: ${pageNum}`);
      // this.loadData();
      this.selectData();
    },
    //登录重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // console.log(this.$refs[formName].resetFields())
    },
    //关闭弹出对话框
    handleClose() {
      this.dialogVisible = false;
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      console.log("图片URL:", res.data);
      this.ruleForm.image = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.ruleForm.image);
    },
    //上传图片
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //新增功能
    insert(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/api/employee", this.ruleForm).then((res) => {
            console.log(res.data.data);
            this.dialogVisible = false;
            window.location.reload(); //刷新页面
          });
        } else {
          console.log("新增失败!!");
          return false;
        }
      });
    },
    //编辑数据回显
    handleEdit(row) {
      this.dialogUpdateVisible = true;
      this.ruleForm = JSON.parse(JSON.stringify(row)); //数据回显
      // this.ruleForm = Object.assign({}, row);
    },
    //删除功能
    handleDelete(row) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.delete("/api/employee/DeleteById/" + row.id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新页面
            this.$router.go(0);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //关闭弹出表单前清空数据
    handleUpdateClose() {
      this.ruleForm = Object.assign({}, this.$options.data().ruleForm);
      console.log("清空表单");
      this.dialogUpdateVisible = false;
    },
    //编辑功能
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put("/api/employee", this.ruleForm).then((res) => {
            console.log(res.data.msg);
            this.dialogUpdateVisible = false;
            window.location.reload(); //刷新页面
          });
        } else {
          console.log("编辑失败!!");
          return false;
        }
      });
    },
    //批量删除功能
    removeRows() {
      this.$confirm("此操作将永久删除选中的用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //判断数组不能为空，如为空就弹出提示
          if (this.ids !== undefined && this.ids.length > 0) {
            axios.delete("/api/employee/ids/" + this.ids).then(() => {
              console.log(this.ids);
              //提示
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              //刷新页面
              this.$router.go(0);
            });
          } else {
            alert("请先选择需要删除的数据！！！");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量删除功能--选择需要删除的行
    handleSelectionChange(selection) {
      console.log(selection);
      this.ids = selection.map((item) => item.id); // 需要根据数据情况调整id名称
      console.log(this.ids);
    },
    //查询部门数据
    selectDept() {
      axios.get("/api/department/selectDeptName").then((res) => {
        this.deptNameOptions = res.data.data;
        // console.log(res.data.data);
      });
    },
  },
  created() {
    this.selectData();
    this.selectDept();
  },
};
</script>

<style lang="less" scoped>
.demo-form-inline {
  text-align: left;
  line-height: 10px;
  font-size: 5px;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 158px;
  height: 158px;
  line-height: 158px;
  text-align: center;
  border: 1px dotted #8b8787;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 0px;
}
</style>