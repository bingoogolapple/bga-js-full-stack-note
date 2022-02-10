<template>
  <div>
    <h4>TodoList</h4>
    <div>
      <input :value="inputValue" @change="handleInputValueChanged" />
      <button @click="handleSubmit">添加</button>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, readonly, toRefs, toRef } from 'vue'

// 列表相关
const listRelativeEffect = () => {
  const list = reactive([])
  const addItemToList = item => {
    list.push(item)
  }
  return { list, addItemToList }
}

// 输入框相关
const inputRelativeEffect = () => {
  const inputValue = ref('')
  const handleInputValueChanged = e => {
    inputValue.value = e.target.value
  }
  return { inputValue, handleInputValueChanged }
}

export default {
  setup() {
    const { list, addItemToList } = listRelativeEffect()
    const { inputValue, handleInputValueChanged } = inputRelativeEffect()
    const handleSubmit = () => {
      if (!inputValue.value) {
        return
      }
      addItemToList(inputValue.value)
      inputValue.value = ''
    }
    return {
      list,
      inputValue,
      handleInputValueChanged,
      handleSubmit
    }
  }
}
</script>

<style scoped lang="less"></style>
