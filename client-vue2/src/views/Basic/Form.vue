<template>
  <div>
    <h4>表单输入绑定</h4>
    <div>
      <!-- 在文本区域插值 (<textarea>{{text}}</textarea>) 并不会生效，应用 v-model 来代替 -->
      <textarea v-model="message" placeholder="add multiple lines"></textarea>
      <span>Multiline message is:</span>
      <p style="white-space: pre-line">{{ message }}</p>
    </div>
    <div>
      单个复选框，绑定到布尔值<br />
      <input type="checkbox" id="checkbox" v-model="checked" />
      <label for="checkbox">{{ checked }}</label>
    </div>
    <div>
      多个复选框，绑定到同一个数组<br />
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames" />
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
      <label for="mike">Mike</label>
      <br />
      <span>多个复选框值为: {{ checkedNames }}</span>
    </div>
    <div>
      单选按钮<br />
      <input type="radio" id="one" value="One" v-model="picked" />
      <label for="one">One</label>
      <br />
      <input type="radio" id="two" value="Two" v-model="picked" />
      <label for="two">Two</label>
      <br />
      <span>单选按钮值为: {{ picked }}</span>
    </div>
    <div>
      单选选择框，绑定到一个属性<br />
      <select v-model="selected">
        <option disabled value="">请选择</option>
        <!-- 单独指定了 value 值那么选中后的值就是指定的 value，否则就是 A -->
        <option value="aa">A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <span>单选选择框值为: {{ selected }}</span
      ><br />
      多选选择框，绑定到一个数组
      <!-- 要按住 Shift 或 Command 键才能选中多个 -->
      <select v-model="selectedArr" multiple style="width: 50px">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <br />
      <span>多选选框值为: {{ selectedArr }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      message: '',
      checked: false,
      checkedNames: [],
      picked: '',
      selected: '',
      selectedArr: []
    }
  }
}
</script>
