<template>
  <div>
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :getDays="getDays"
      @remove="$emit('remove', $event)"
    />
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'
defineProps(['tasks', 'getDays'])
defineEmits(['remove'])
</script>
