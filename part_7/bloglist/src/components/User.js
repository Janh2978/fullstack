import React from 'react'

import { Header, List } from 'semantic-ui-react'

const User = ({ user }) => {
  if (user === undefined) {
    return null
  }

  return (
    <div>
      <Header as='h1'>{user.name}</Header>
      <Header as='h2'>added blogs</Header>
      <List>
        {
          user.blogs.map((post) =>
            <List.Item key={post.id}>{post.title}</List.Item>
          )
        }
      </List>
    </div>
  )
}

export default User
