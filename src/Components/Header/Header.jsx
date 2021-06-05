import React from "react";

export default function Header({
  user,
  conversationItems,
  users,
  activeConversation,
  setActiveConversation,
}) {

  return (
      <div>
    {conversationItems.map((conversation) => (
        <>
          {conversation._id === activeConversation ? (
            <>
              <h2>
                Messages with &nbsp;&nbsp;
                {users.map((user) => (
                  <>{user._id === conversation.user1 ? user.name : ""}</>
                ))}
                &nbsp;&nbsp;and&nbsp;&nbsp;
                {users.map((user) => (
                  <>{user._id === conversation.user2 ? user.name : ""}</>
                ))}
              </h2>
            </>
          ) : (
            ""
          )}
        </>
      ))}
      </div>
  );
}
