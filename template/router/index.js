export default [{
  path:'/{{path}}',
  component:()=>import('@/modules/{{module}}/views/{{path}}/index.vue'),
  meta:{
    title:'{{title}}'
  }
}]