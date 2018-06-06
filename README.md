# involves-changelog-server

### Install
```bash
$ npm install involves-changelog-server -g
```

### API
| Argument               | Type            | Default Value | Description                                                          |
|------------------------|-----------------|---------------|----------------------------------------------------------------------|
| options                | Object          | `{}`          | Options object.                                                      |
| options.port           | Number          | `3000`        | HTTP server port.                                                    |
| options.mongourl       | String          | `localhost`   | MongoDB connection string.                                           |

### CLI
```
$ involves-changelog-server --mongourl=mongodb://localhost:27017/involves-changelog --port=80
```
