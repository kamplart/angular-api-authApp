
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';


@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router )


  public myForm: FormGroup = this.fb.group({
    name:    ['camilo', [ Validators.required,  Validators.minLength(3) ]],
    email:    ['olaa@gmail.com', [ Validators.required, Validators.email ]],
    password: ['olaola', [ Validators.required, Validators.minLength(6) ]],
  });


  login() {
    const { name, email, password } = this.myForm.value;

    this.authService.register(name,email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          Swal.fire('Error', message, 'error' )
        }
      })

  }

}
