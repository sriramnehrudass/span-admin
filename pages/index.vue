<template>
  <div class="">
    <!-- breadcrums -->
    <div class="mb-4">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>Manage Employee</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- content-area -->
    <EmployeeTable/>
  </div>
</template>

<script>
import EmployeeTable from '@/components/forms/EmployeeTable'
export default {
  layout: "DashboardLayout",
  components:{
    EmployeeTable
  }
};
</script>

<style>
</style>