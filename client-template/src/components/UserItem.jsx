import React, { useState } from "react";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { useDataContext } from "../context/DataProvider";
import { updateUserApi } from "../helpers/apiCalls";

export const UserItem = ({ user }) => {
  const { user: userLoggedIn, users, setUsers } = useDataContext(); // import from context & renamed user to other variable -> userLoggedIn
  const [editMode, setEditMode] = useState(false);
  const [userCopy, setUserCopy] = useState(user);

  const handleChange = (e) => {
    // console.log(userCopy);
    // console.log(e.target.value);
    // create Copy before state update & update in one step
    const updated = { ...userCopy, [e.target.name]: e.target.value };
    // console.log(updated);
    setUserCopy(updated);
  };

  const submitUpdate = async () => {
    // send updated user (not saved yet) => to API
    const userUpdatedApi = await updateUserApi(
      userLoggedIn.token,
      userCopy._id,
      userCopy
    );
    console.log(userUpdatedApi);
    setEditMode(false);

    // if API saving / updating woeked => update user also in Context
    // find user that we updated in our context by _id
    // if found => REPLASE by the user from API
    // all other users => dont touch!
    const usersCopy = users.map((_user) => {
      return _user._id === userUpdatedApi._id ? userUpdatedApi : _user;
    });

    setUsers(usersCopy);
  };

  return (
    <div className="user" key={user._id}>
        {editMode ? (
          <div className="edit">
            <input name="name" value={userCopy.name} onChange={handleChange} />
            <input
              name="email"
              value={userCopy.email}
              onChange={handleChange}
            />
            <button onClick={submitUpdate}>Save</button>
          </div>
        ) : (
          <div className="item">
            <div className="name">{userCopy.name}</div>
            <div className="email">{userCopy.email}</div>
          </div>
        )}
        <div className="icons">
          <AiTwotoneEdit
            className="icon"
            onClick={() => setEditMode(!editMode)}
          />
          <AiFillDelete className="icon" />
        </div>
      </div>
  );
};
