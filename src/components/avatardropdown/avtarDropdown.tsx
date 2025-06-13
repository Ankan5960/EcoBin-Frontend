import { LogIn, LogOut, Settings, User, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuthRole, useAuthState } from "@/store/authStore";
import { LogOutService } from "./logout.service";

export function AvtarDropdown() {
  const navigate = useNavigate();
  const role = useAuthRole();
  const user = useAuthState();
  const logoutService = new LogOutService();

  const handleLogOut = async () => {
    user && (await logoutService.logout({ refreshToken: user.refreshToken }));
    // navigate("/login");
    window.location.href = "/login";
  };

  const handelLogIn = () => {
    navigate("/login");
  };

  const handelSignUp = () => {
    navigate("/signup");
  };

  const handelSetings = () => {
    navigate("settings");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="text-black text-xl">
            {role ? role.charAt(0).toUpperCase() : "G"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {role === "Guest" || user === null ? (
          <>
            <DropdownMenuItem onClick={handelLogIn}>
              <LogIn />
              <span>Log In</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handelSignUp}>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Sign Up</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handelSetings}>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
