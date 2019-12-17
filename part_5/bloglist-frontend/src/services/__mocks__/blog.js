const blogs = [
  {
    'title': 'post1',
    'author': 'Jorge Navarro',
    'url': 'local.com',
    'likes': 9,
    'user': {
      'username': 'username',
      'name': 'Alejandro Navarro',
      'id': '5dec39fd5c43bc056c05a127'
    },
    'id': '5ded9149acbb9605083bd95d'
  },
  {
    'title': 'post3',
    'author': 'Jorge Navarro',
    'url': 'local.com',
    'likes': 14,
    'user': {
      'username': 'janh2978',
      'name': 'Jorge Navarro',
      'id': '5ded968db7d8d42f2c6da47f'
    },
    'id': '5dedaab321e8ae1b10103c44'
  },
  {
    'title': 'new blog',
    'author': 'Alejandro Huapaya',
    'url': 'local.com',
    'likes': 1,
    'user': {
      'username': 'janh2978',
      'name': 'Jorge Navarro',
      'id': '5ded968db7d8d42f2c6da47f'
    },
    'id': '5df2555f099cda2e80f47b44'
  },
  {
    'title': 'newblog2!',
    'author': 'Alejandro Huapaya',
    'url': 'local.com',
    'likes': 1,
    'user': {
      'username': 'janh2978',
      'name': 'Jorge Navarro',
      'id': '5ded968db7d8d42f2c6da47f'
    },
    'id': '5df272863334fa23ace72b2b'
  },
  {
    'title': '¡newblog3!',
    'author': 'Jorge Navarro',
    'url': 'local.com',
    'likes': 2,
    'user': {
      'username': 'hellas',
      'name': 'Arto Hellas',
      'id': '5dec2e075b81ef2bacef2645'
    },
    'id': '5df273d63334fa23ace72b2c'
  },
  {
    'title': '¿blog4?',
    'author': 'Jorge Navarro',
    'url': 'local.com',
    'likes': 1,
    'user': {
      'username': 'janh2978',
      'name': 'Jorge Navarro',
      'id': '5ded968db7d8d42f2c6da47f'
    },
    'id': '5df274583334fa23ace72b2d'
  },
  {
    'title': 'the blog',
    'author': 'blogger',
    'url': 'local.com',
    'likes': 6,
    'user': {
      'username': 'janh2978',
      'name': 'Jorge Navarro',
      'id': '5ded968db7d8d42f2c6da47f'
    },
    'id': '5df2915f272356181447f5a4'
  },
  {
    'title': 'try',
    'author': 'test',
    'url': 'asd.com',
    'likes': 3,
    'user': {
      'username': 'janh2978',
      'name': 'Jorge Navarro',
      'id': '5ded968db7d8d42f2c6da47f'
    },
    'id': '5df29211272356181447f5a6'
  },
  {
    'title': 'new test',
    'author': 'tester',
    'url': 'local.com',
    'likes': 9,
    'user': {
      'username': 'janh2978',
      'name': 'Jorge Navarro',
      'id': '5ded968db7d8d42f2c6da47f'
    },
    'id': '5df29558f741840b90a0c320'
  },
  {
    'title': 'new new test!!',
    'author': 'tester',
    'url': 'local.com',
    'likes': 2,
    'user': {
      'username': 'janh2978',
      'name': 'Jorge Navarro',
      'id': '5ded968db7d8d42f2c6da47f'
    },
    'id': '5df295c5f741840b90a0c321'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }