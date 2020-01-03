import React from 'react'

import { Table, Header } from 'semantic-ui-react'

import {
  Link
} from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <Header as='h2'>Users</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            users.map((u) =>
              <Table.Row key={u.id}>
                <Table.Cell>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </Table.Cell>
                <Table.Cell>{u.blogs.length}</Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default Users
