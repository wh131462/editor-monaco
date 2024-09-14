export interface Declare {
    className: string;
    propertyTypes: PropertyType;
    methods: MethodsType;
}

export type PropertyType = { [key: string]: string };
export type MethodsType = { [key: string]: { params: string[]; returnType: string } };

export const formEditorTmp = `
declare class FormEditor extends FormRender {
                    editorProperty: string;
                    constructor();
                    edit(): void;
                }
`;

// 代码编辑器中的内容
export const template = `
class FormComponent extends FormRender {
    // 必须在这里声明变量
    state = {
        name: "mm",
        static: [1,2,3],

    };

    // 初始化,未创建dom时
    // 只能处理数据
    onInit(){
        this.state.dataSource = [1,2,3]
    }
    // 创建完成dom
    onMounted(){
        this.initEvents();
        this.get("ds1").dataSource = this.state.dataSource;
    }
    // 状态发送改变
    onChanges(){
        this.refreshDs1DataSource();
    }
    // 销毁时
    onDestroy(){
        console.log("结束了")
    }
    // 初始化事件
    initEvents(){
        const id1 = this.get("id1");
        const id2 = this.get("id2");
        // 解析通过on来获取具体的事件
        id1.addEventListener("click",(e)=>{
           id2.setValue(id1.value);
           id2.setHidden(true);
           this.setHidden("id3",false)
        });
    }

    refreshDs1DataSource(){
        this.get("ds1").loadDataSource();
    }
    /*
    * 独立可调用事件 - 在组件中调用
    */
    refreshState(){
        this.state.dataSource = this.state.dataSource.slice();
    }

    setId1(property, value){
        this.get("id1").setProperty(property, value);
    }
}
`;
