/* __placeholder__ */

import './main.scss'
import LeftNavbar from './components/leftnavbar/LeftNavbar.vue'
import TopNavbar from './components/topNavbar/TopNavbar.vue'
import MainPage from './views/mainPage/MainPage.vue'



const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');

const __VLS_componentsOption = {};

let __VLS_name!: 'App';
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {
};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {}
 & { 'app'?: boolean }
 & { 'appMainContainer'?: boolean };
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {}
& __VLS_WithComponent<'LeftNavbar', typeof __VLS_localComponents, "LeftNavbar", "LeftNavbar", "LeftNavbar">
& __VLS_WithComponent<'TopNavbar', typeof __VLS_localComponents, "TopNavbar", "TopNavbar", "TopNavbar">
& __VLS_WithComponent<'MainPage', typeof __VLS_localComponents, "MainPage", "MainPage", "MainPage">
;
__VLS_intrinsicElements.div;__VLS_intrinsicElements.div;__VLS_intrinsicElements.div;__VLS_intrinsicElements.div;
__VLS_components.LeftNavbar;
// @ts-ignore
[LeftNavbar,];
__VLS_components.TopNavbar;
// @ts-ignore
[TopNavbar,];
__VLS_components.MainPage;
// @ts-ignore
[MainPage,];
{
const __VLS_0 = __VLS_intrinsicElements["div"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
const __VLS_2 = __VLS_1({ ...{ }, class: ("app"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{ }, class: ("app"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
{
let __VLS_5!: 'LeftNavbar' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.LeftNavbar : typeof __VLS_resolvedLocalAndGlobalComponents['LeftNavbar'];
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({...{ }, }));
({} as { LeftNavbar: typeof __VLS_5 }).LeftNavbar;
const __VLS_7 = __VLS_6({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
}
{
const __VLS_10 = __VLS_intrinsicElements["div"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
const __VLS_12 = __VLS_11({ ...{ }, class: ("appMainContainer"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{ }, class: ("appMainContainer"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
let __VLS_15!: 'TopNavbar' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.TopNavbar : typeof __VLS_resolvedLocalAndGlobalComponents['TopNavbar'];
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({...{ }, }));
({} as { TopNavbar: typeof __VLS_15 }).TopNavbar;
const __VLS_17 = __VLS_16({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
}
{
let __VLS_20!: 'MainPage' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.MainPage : typeof __VLS_resolvedLocalAndGlobalComponents['MainPage'];
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({...{ }, }));
({} as { MainPage: typeof __VLS_20 }).MainPage;
const __VLS_22 = __VLS_21({ ...{ }, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{ }, });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
}
(__VLS_13.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["app"];
__VLS_styleScopedClasses["appMainContainer"];
}
var __VLS_slots!:{
};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
LeftNavbar: LeftNavbar as typeof LeftNavbar,
TopNavbar: TopNavbar as typeof TopNavbar,
MainPage: MainPage as typeof MainPage,
};
},
});
export default (await import('vue')).defineComponent({
setup() {
return {
};
},
});


