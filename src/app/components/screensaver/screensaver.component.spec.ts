import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreensaverComponent } from './screensaver.component';

describe('ScreensaverComponent', () => {
  let component: ScreensaverComponent;
  let fixture: ComponentFixture<ScreensaverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreensaverComponent]
    });
    fixture = TestBed.createComponent(ScreensaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
