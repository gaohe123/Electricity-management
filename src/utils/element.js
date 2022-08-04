
import {
    Button,
    Table,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Form, Input, FormItem, MessageBox, Message,
    Result,
    Icon,
    Breadcrumb,
    BreadcrumbItem,
    TableColumn,
    Switch,
    Pagination,
    Dialog,
    Select,
    Option,
    Tag,
    Tree,
    Upload,
    Cascader,
    Tabs,
    TabPane,
    Loading
} from 'element-ui';
import MyTable from '@/components/Table';
import MyDialog from '@/components/Dialog';
import MyForm from '@/components/Form';
import DF from '@/components/DialogForm';
import Search from '@/components/Search'

export default {
    /**
     * @description 安装方法
     * @param {Vue} Vue vue对象
     */
    install(Vue) {
        Vue.prototype.$mb = MessageBox;
        Vue.prototype.$confirm=(msg,title='提示')=>{
            return new Promise((resolve,reject)=>{
                MessageBox.confirm(msg,title,{
                    beforeClose(action,instance){
                        if(action==='confirm'){
                            return resolve(instance.close)
                        }
                        if(action==='cancel'){
                            reject();
                            instance.close();
                        }
                    }
                })
            })    
        }; 
        Vue.prototype.$m = Message;
        /**
         * 注册element-ui组件
         */
        [MyTable,MyDialog,MyForm,DF,Search].forEach(component=>Vue.component(component.name,component));
        [Switch,Loading,Upload,Tabs,Tag,Tree,TabPane,Select,Option,Cascader,Dialog,Pagination,Button, Table,TableColumn, Form, Input, FormItem, Menu, Submenu, MenuItem, MenuItemGroup,Result,Icon,Breadcrumb,BreadcrumbItem].forEach(component => Vue.use(component))
    }
}