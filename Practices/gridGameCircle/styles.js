
body,
.App {
  font-family: sans-serif;
  text-align: center;
  width: 100%;
  height: 100vh;
  background-color: black;
}

* {
  margin: 0px;
  padding: 0px;
}

.grid-wrapper {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  margin: 42px auto;

  .grid-container {
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(8, 60px);
    grid-template-rows: repeat(6, 60px);
    gap: 4px;

    .box {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid lightgray;

      .circle {
        width: 50%;
        height: 50%;
        border-radius: 50%;
      }
    }
  }

  .btn-actions {
    width: 100%;
    margin-top: 12px;
    height: fit-content;
    display: flex;
    gap: 8px;
    justify-content: center;

    button {
      width: fit-content;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
