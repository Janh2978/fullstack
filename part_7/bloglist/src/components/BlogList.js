import React from 'react'
import { connect } from 'react-redux'

import { Table } from 'semantic-ui-react'

import {
  Link
} from 'react-router-dom'

const BlogList = (props) => {

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Blog</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            props.blogsSorted.map((blog, i) =>
              <Table.Row key={blog.id}>
                <Table.Cell>
                  <Link id={`Blog-${i}`} to={`/blog/${blog.id}`}>{blog.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  {
                    blog.user.id
                      ? <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
                      : <Link to={`/users/${blog.user}`}>{props.user.name}</Link>
                  }
                </Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    </div>
  )
}

const blogsSorted = ({ blogs }) => {
  return blogs.sort((a,b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    blogsSorted: blogsSorted(state),
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  null
)(BlogList)