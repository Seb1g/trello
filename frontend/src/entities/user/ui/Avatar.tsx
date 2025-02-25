import {UserSelector} from "../model/userSelector.ts";

export const Avatar = () => {

  const {user} = UserSelector();
  return (
    <div className="userData-img">
      <div
        style={{
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "orange",
          borderRadius: "2rem",
        }}>{user.user === null ? "" : user.user.name[0]}</div>
    </div>
  )
}