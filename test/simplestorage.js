const controller = await UserController.deployed()

    const tx = await controller.createUser(
      "tristan",
      "Tristan",
      "Edwards",
      "I like building stuff",
      "example@example.com"
    )

    assert.isOk(tx)

  

