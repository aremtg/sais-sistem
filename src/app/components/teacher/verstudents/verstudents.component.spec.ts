import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerstudentsComponent } from './verstudents.component';

describe('VerstudentsComponent', () => {
  let component: VerstudentsComponent;
  let fixture: ComponentFixture<VerstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerstudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
