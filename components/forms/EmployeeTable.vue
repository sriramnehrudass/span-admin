<template>
  <div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="d-flex justify-content-between">
            <span>Manage Employees</span>
            <span class="d-flex flex-row">
              <el-button type="danger" icon="el-icon-remove">Delete</el-button>
              <el-button
                type="success"
                icon="el-icon-circle-plus"
                @click="addAdminModal()"
                >Add New Admin</el-button
              >
            </span>
          </div>
        </div>
        <div class="">
          <el-table
            ref="multipleTable"
            :data="admins.data"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"> </el-table-column>
            <el-table-column
              prop="admin_fname"
              label="First Name"
              min-width="150px"
            >
            </el-table-column>
            <el-table-column
              prop="admin_lname"
              label="Last Name"
              min-width="150px"
            >
            </el-table-column>
            <el-table-column
              prop="admin_email"
              label="E-mail"
              min-width="150px"
            >
            </el-table-column>
            <el-table-column label="Actions">
              <template v-slot="{ row }">
                <div class="d-flex flex-row">
                  <i
                    class="el-icon-edit"
                    @click="editAdminModal(row.admin_id)"
                  ></i>
                  <i
                    class="el-icon-delete ml-4"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    @click="deleteAdmin(row.admin_id)"
                  ></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="d-flex justify-content-between mt-2" v-if="admins.total!=null">
            <p>Showing {{ admins.total }} outof {{ admins.total }} entries</p>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="admins.lastPage"
              @current-change="setPage"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <!-- modals -->
    <b-modal ref="admin-modal" centered hide-footer :title="`${modalTitle}`">
      <b-form-group label="First Name:" label-for="input-2">
        <b-form-input
          placeholder="Enter first name"
          v-model="adminData.admin_fname"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Last Name:" label-for="input-2">
        <b-form-input
          placeholder="Enter last name"
          v-model="adminData.admin_lname"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Email:" label-for="input-2">
        <b-form-input
          placeholder="Enter email"
          v-model="adminData.admin_email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Password:"
        label-for="input-2"
        v-if="formType == 'add'"
      >
        <b-form-input
          placeholder="Enter password" type="password"
          v-model="adminData.admin_password"
        ></b-form-input>
      </b-form-group>
      <div class="d-flex justify-content-end footer">
        <b-button variant="link" @click="$refs['admin-modal'].hide()"
          >Cancel</b-button
        >
        <b-button variant="success" v-if="formType == 'add'" @click="createAdmin">Add</b-button>
        <b-button variant="success" v-else @click="updateAdmin">Update</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
 
  data() {
    return {
      admins: {},
      currentPage: 1,
      modalTitle: null,
      formType: null,
      adminId:null,
      adminData: {
        admin_fname: null,
        admin_lname: null,
        admin_email: null,
        admin_password: null,
      },
    };
  },
  mounted() {
    this.getAdmins();
  },
  methods: {
    getAdmins() {
      this.$axios
        .$get("user", {
          params: {
            page: this.currentPage,
          },
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.admins = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteAdmin(id) {
      this.$confirm(
        "This will permanently delete the admin. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
          center: true,
        }
      )
        .then(() => {
          this.$axios
            .$delete(`user/${id}`, {
              headers: {
                Authorization: "Bearer " + this.token,
              },
            })
            .then((response) => {
              this.getAdmins();
              this.$message({
                type: "success",
                message: "Delete completed",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    addAdminModal() {
      this.modalTitle = "Add Admin";
      this.adminData.admin_fname = null;
      this.adminData.admin_lname = null;
      this.adminData.admin_email = null;
      this.adminData.admin_password = null;
      this.formType = "add";
      this.$refs["admin-modal"].show();
    },
    editAdminModal(id) {
      this.modalTitle = "Edit Admin";
      this.formType = "edit";
      this.adminId=id;
      this.$axios
        .$get(`user/${id}`, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          Object.assign(this.adminData, response.data);
          this.$refs["admin-modal"].show();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createAdmin() {
      this.$axios
        .$post("user",this.adminData, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.$refs['admin-modal'].hide();
          this.getAdmins();
          this.$message({
                type: "success",
                message: "Admin Added Successfully",
              });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateAdmin() {
      this.$axios
        .$patch(`user/${this.adminId}`,this.adminData, {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.$refs['admin-modal'].hide();
          this.getAdmins();
          this.$message({
                type: "success",
                message: "Admin details updated successfully",
              });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setPage (val) {
        this.currentPage = val;
        this.getAdmins();
        
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
      }
  },
};
</script>
<style scoped>
</style>

