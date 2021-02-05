// import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import {
  // ElAlert,
  // ElAside,
  // ElAutocomplete,
  // ElAvatar,
  // ElBacktop,
  // ElBadge,
  // ElBreadcrumb,
  // ElBreadcrumbItem,
  ElButton,
  // ElButtonGroup,
  // ElCalendar,
  // ElCard,
  // ElCarousel,
  // ElCarouselItem,
  // ElCascader,
  // ElCascaderPanel,
  // ElCheckbox,
  // ElCheckboxButton,
  // ElCheckboxGroup,
  ElCol,
  // ElCollapse,
  // ElCollapseItem,
  // ElCollapseTransition,
  // ElColorPicker,
  ElContainer,
  // ElDatePicker,
  // ElDialog,
  // ElDivider,
  // ElDrawer,
  // ElDropdown,
  // ElDropdownItem,
  // ElDropdownMenu,
  ElFooter,
  // ElForm,
  // ElFormItem,
  ElHeader,
  // ElIcon,
  // ElImage,
  ElInput,
  // ElInputNumber,
  // ElLink,
  // ElMain,
  // ElMenu,
  // ElMenuItem,
  // ElMenuItemGroup,
  // ElOption,
  // ElOptionGroup,
  // ElPageHeader,
  ElPagination,
  // ElPopconfirm,
  // ElPopover,
  // ElPopper,
  // ElProgress,
  // ElRadio,
  // ElRadioButton,
  // ElRadioGroup,
  // ElRate,
  ElRow,
  // ElScrollbar,
  // ElSelect,
  // ElSlider,
  // ElStep,
  // ElSteps,
  // ElSubmenu,
  // ElSwitch,
  // ElTabPane,
  ElTable,
  ElTableColumn
  // ElTabs,
  // ElTag,
  // ElTimePicker,
  // ElTimeSelect,
  // ElTimeline,
  // ElTimelineItem,
  // ElTooltip,
  // ElTransfer,
  // ElTree,
  // ElUpload,
  // ElInfiniteScroll,
  // ElLoading,
  // ElMessage,
  // ElMessageBox,
  // ElNotification
} from "element-plus";

// const components: any = [
//   ElAlert,
//   ElAside,
//   ElAutocomplete,
//   ElAvatar,
//   ElBacktop,
//   ElBadge,
//   ElBreadcrumb,
//   ElBreadcrumbItem,
//   ElButton,
//   ElButtonGroup,
//   ElCalendar,
//   ElCard,
//   ElCarousel,
//   ElCarouselItem,
//   ElCascader,
//   ElCascaderPanel,
//   ElCheckbox,
//   ElCheckboxButton,
//   ElCheckboxGroup,
//   ElCol,
//   ElCollapse,
//   ElCollapseItem,
//   ElCollapseTransition,
//   ElColorPicker,
//   ElContainer,
//   ElDatePicker,
//   ElDialog,
//   ElDivider,
//   ElDrawer,
//   ElDropdown,
//   ElDropdownItem,
//   ElDropdownMenu,
//   ElFooter,
//   ElForm,
//   ElFormItem,
//   ElHeader,
//   ElIcon,
//   ElImage,
//   ElInput,
//   ElInputNumber,
//   ElLink,
//   ElMain,
//   ElMenu,
//   ElMenuItem,
//   ElMenuItemGroup,
//   ElOption,
//   ElOptionGroup,
//   ElPageHeader,
//   ElPagination,
//   ElPopconfirm,
//   ElPopover,
//   ElPopper,
//   ElProgress,
//   ElRadio,
//   ElRadioButton,
//   ElRadioGroup,
//   ElRate,
//   ElRow,
//   ElScrollbar,
//   ElSelect,
//   ElSlider,
//   ElStep,
//   ElSteps,
//   ElSubmenu,
//   ElSwitch,
//   ElTabPane,
//   ElTable,
//   ElTableColumn,
//   ElTabs,
//   ElTag,
//   ElTimePicker,
//   ElTimeSelect,
//   ElTimeline,
//   ElTimelineItem,
//   ElTooltip,
//   ElTransfer,
//   ElTree,
//   ElUpload,
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification
// ];

// const plugins: any= [
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification
// ];

// createApp(App)
//   .use(router)
//   .use(ElementPlus)
//   .mount("#app");
// const app = createApp(App)

// components.forEach(component => {
//   app.component(component.name, component)
// });

// plugins.forEach(plugin => {
//   app.use(plugin);
// });

const app = createApp(App);
app.config.globalProperties.$ELEMENT = { size: "small", zIndex: 3000 };
app.component(ElButton.name, ElButton);
app.component(ElCol.name, ElCol);
app.component(ElInput.name, ElInput);
app.component(ElPagination.name, ElPagination);
app.component(ElRow.name, ElRow);
app.component(ElTable.name, ElTable);
app.component(ElTableColumn.name, ElTableColumn);
app.component(ElFooter.name, ElFooter);
app.component(ElContainer.name, ElContainer);
app.component(ElHeader.name, ElHeader);
app.use(router).mount("#app");
