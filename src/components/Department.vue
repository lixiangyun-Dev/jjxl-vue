<template>
  <div>
    <!-- 新增 -->
    <el-row>
      <el-button type="primary" @click="dialogVisible = true"
        >新增部门</el-button
      >
    </el-row>
    <el-dialog
      style="text-align: left"
      title="新增部门"
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
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span style="text-align: center" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="insert('ruleForm')">保 存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 显示部门全部数据 -->
    <el-table style="text-align: center" :data="tableData" border>
      <el-table-column
        type="index"
        :index="indexMethod"
        prop="id"
        label="序号"
        width="85"
      ></el-table-column>
      <el-table-column prop="name" label="部门名称" width="260">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="最后更新日期"
        width="300"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-dialog
            style="text-align: left"
            title="编辑部门"
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
              <el-form-item label="部门名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
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
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <br />
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
</template>

<script>
import axios from "axios";
export default {
  name: "department",
  data() {
    return {
      tableData: [],
      currentPage4: 1,
      pageSize: 10,
      total: 0,
      ruleForm: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      dialogVisible: false,
      dialogUpdateVisible: false,
    };
  },
  methods: {
    load() {
      axios.get("/api/department",{
        params: {
          page: this.currentPage4,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data.rows;
        this.total = res.data.data.total;
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      console.log(`每页 ${pageSize} 条`);
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.currentPage4 = pageNum;
      console.log(`当前页: ${pageNum}`);
      this.load();
    },
    insert(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/api/department", this.ruleForm).then((res) => {
            console.log(res.data.msg);
            this.dialogVisible = false;
            this.$router.go(0); //刷新页面
          });
        } else {
          console.log("新增失败!!");
          return false;
        }
      });
    },
    handleClose() {
      // this.$refs.ruleForm.resetFields();
      // this.ruleForm = Object.assign({},this.$options.data().ruleForm);
      // console.log("清空表单")
      this.dialogVisible = false;
    },
    handleEdit(row) {
      this.dialogUpdateVisible = true;
      this.ruleForm = Object.assign({}, row); //回显数据
      // this.ruleForm = JSON.parse(JSON.stringify(row));
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put("/api/department", this.ruleForm).then((res) => {
            console.log(res.data.msg);
            this.dialogUpdateVisible = false;
            // this.$nextTick(() => {
            //   this.ruleForm.name = formName.ruleForm
            // })
            window.location.reload(); //刷新页面
          });
        } else {
          console.log("编辑失败!!");
          return false;
        }
      });
    },
    handleUpdateClose() {
      // this.$refs.ruleForm.resetFields();
      this.ruleForm = Object.assign({}, this.$options.data().ruleForm);
      console.log("清空表单");
      this.dialogUpdateVisible = false;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.delete("/api/department/" + row.id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //重新获取列表的接口
            // this.getList();
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
  },
  created() {
    this.load();
  },
};
</script>

<style lang="less" scoped>
</style>