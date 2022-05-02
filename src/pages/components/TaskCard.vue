<template>
  <div style="display: flex">
    <task-group class="task-group" title="ToDo" group="task">
      <task-item :key="index" v-for="(item, index) in todoList" :content="item" />
    </task-group>
    <task-group class="task-group" title="In Progress" group="task">
      <task-item :key="index" v-for="(item, index) in inproList" :content="item" />
    </task-group>
    <task-group class="task-group" title="Done" group="task">
      <task-item :key="index" v-for="(item, index) in doneList" :content="item" />
    </task-group>
  </div>
</template>

<script>
import TaskGroup from '../../components/task/TaskGroup'
import TaskItem from '../../components/task/TaskItem'
const todoList = ['작업1', '작업2', '작업3', '작업4', '작업5', '작업6']
const inproList = ['진행중1', '진행중2', '진행중3', '진행중4', '진행중5', '진행중6']
const doneList = ['미션13', '미션14', '미션15', '미션16', '미션17', '미션18']
export default {
  name: 'TaskCard',
  components: {TaskItem, TaskGroup},
  data () {
    return {
      todoList,
      inproList,
      doneList
    }
  }
}
</script>

<style lang="less" scoped>
  .task-group{
    margin: 0 48px;
  }
  .dragable-ghost{
    border: 1px dashed red;
    opacity: 1;
  }
  .dragable-chose{
    border: 1px dashed red;
    opacity: 0.8;
  }
  .dragable-drag{
    border: 1px dashed red;
    opacity: 1;
  }
</style>
