<template>
  <a-layout-header :style="headerStyle" ></a-layout-header>
</template>

<script>
import { defineComponent} from 'vue';
export default defineComponent({
  name: "menu_head",
  setup(){
    const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
      width:'100%',
};
    return{
headerStyle
    }
  }
})
</script>

<style>

</style>