import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosFornecedoresComponent } from './todos-fornecedores.component';

describe('TodosFornecedoresComponent', () => {
  let component: TodosFornecedoresComponent;
  let fixture: ComponentFixture<TodosFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosFornecedoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
