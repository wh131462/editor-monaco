import { Component } from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { EditorComponent } from "editor-monaco"
@Component({
  standalone: true,
  imports: [CommonModule,FormsModule,EditorComponent],
  selector: 'editor-monaco-editor-demo',
  template: `
  <p>editor-demo</p>
  <ui-editor></ui-editor>
  `,
  styles: [``],
})
export class EditorDemoComponent {
}
