import { Component, Injector, Input, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as monaco from 'monaco-editor';
import { Declare, MethodsType, PropertyType } from './script-editor.const';
import { Subject } from 'rxjs';

@Component({
  selector: 'ui-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  // editor: monaco.editor.IStandaloneCodeEditor;
  @Input() theme = 'vs-dark';
  @Input() language = 'javascript';

  private _monacoPath = 'assets/monaco-editor/vs';
  isMonacoLoaded: Subject<boolean> = new Subject<boolean>();

  editor!: monaco.editor.IStandaloneCodeEditor;

  constructor(private injector: Injector, private ngZone: NgZone) {
    const onGotAmdLoader = () => {
      /* Load monaco */
      (<any>window).require.config({ paths: { vs: this._monacoPath } });
      (<any>window).require(['vs/editor/editor.main'], () => {
        ngZone.run(() => {
          this.isMonacoLoaded.next(true);
        });
      });
    };

    /* Load AMD loader if necessary */
    if (!(<any>window).require) {
      const loaderScript = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = 'assets/monaco-editor/vs/loader.js'; //`${this._monacoPath}/loader.js`;
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }

  ngAfterViewInit() {
    this.isMonacoLoaded.subscribe((res) => {
      this.editor = monaco.editor.create(document.getElementById('editor-container')!, {
        value: `const a = 1;`,
        language: this.language,
        theme: this.theme,
        automaticLayout: true,
        minimap: {
          enabled: false
        }
      });
    });
  }

  ngOnInit() {
    this.initEditor();
  }

  initEditor() {
    // // 环境不对
    // this.editor = monaco.editor.create(document.getElementById('editor-container'), {
    //     value: `${template}`,
    //     language: this.language,
    //     theme: this.theme,
    //     automaticLayout: true,
    //     minimap: {
    //         enabled: false
    //     }
    // });
    // const renderInstance = this.injector.get(RendererComponent);
    // const declare = this.getDeclare(this.getClassStructure(renderInstance));
    // // 有没有可能在编译的时候 获取
    // monaco.languages.typescript.javascriptDefaults.addExtraLib(declare + formEditorTmp, 'filename/formEditor.d.ts');
    //
    // this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    //     this.editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
    // });
  }

  getClassStructure(instance: any): Declare {
    const properties = Object.getOwnPropertyNames(instance);
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance));
    const className = instance.constructor.name;

    // 获取属性及其类型
    const propertyTypes: PropertyType = {};
    properties.forEach((prop) => {
      if (typeof instance[prop] !== 'function') {
        propertyTypes[prop] = typeof instance[prop];
      }
    });

    // 获取方法的参数名称列表的辅助函数
    const getParamNames = (func: any): string[] => {
      const funcStr = func.toString();
      const paramMatch = funcStr.match(/\(([^)]*)\)/);
      return paramMatch ? paramMatch[1].split(',').map((param: string) => param.trim()) : [];
    };

    // 获取方法的参数和返回值类型
    const methodDetails: MethodsType = {};
    methods.forEach((method) => {
      if (typeof instance[method] === 'function') {
        // 获取函数的参数名称列表
        const paramNames = getParamNames(instance[method]);
        // 推断返回值类型，不直接调用函数
        const returnType = typeof instance[method];
        methodDetails[method] = { params: paramNames, returnType };
      }
    });

    return {
      className: className,
      propertyTypes: propertyTypes,
      methods: methodDetails
    };
  }

  getDeclare(structure: Declare): string {
    const { className, propertyTypes, methods } = structure;
    const declare = `declare class ${className} {`;
    let propertyDeclare = '';
    let methodDeclare = '';
    for (const prop in propertyTypes) {
      propertyDeclare += `\n  ${prop}: ${propertyTypes[prop]};`;
    }
    for (const method in methods) {
      const { params, returnType } = methods[method];
      methodDeclare += `\n  ${method}(${params.map((param) => `${param}: any`).join(', ')}): ${returnType};`;
    }
    return declare + propertyDeclare + methodDeclare + `\n}`;
  }
}
