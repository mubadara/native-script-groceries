import { Component, OnInit } from "@angular/core";
import { User } from "../shared/user/user.model";
import { UserService } from "../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: "gr-login",
  providers: [UserService],
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  ngOnInit() {
    this.page.actionBarHidden = true;
  }
  constructor(private router: Router,private userService: UserService, private page: Page) {
    this.user = new User();
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }
  
  login() {
    this.userService.login(this.user)
      .subscribe(
        () => this.router.navigate(["/list"]),
        (exception) => {
            if(exception.error && exception.error.description) {
                alert(exception.error.description);
            } else {
                alert(exception)
            }
        }
      );
  }
  
  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        (exception) => {
            if(exception.error && exception.error.description) {
                alert(exception.error.description);
            } else {
                alert(exception)
            }
        }
      );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}