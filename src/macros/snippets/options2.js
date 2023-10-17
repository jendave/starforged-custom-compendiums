let d = new Dialog({
    title: 'Example',
    content: `
      <form class="flexcol">
        <div class="form-group">
          <label for="exampleSelect1">Example Select 1</label>
          <select name="exampleSelect1">
            <option value="option1">Option One</option>
            <option value="option2">Option Two</option>
            <option value="option3">Option Three</option>
          </select>
        </div>
        <div class="form-group">
          <label for="exampleSelect2">Example Select 2</label>
          <select name="exampleSelect2">
            <option value="option1">Option One</option>
            <option value="option2">Option Two</option>
            <option value="option3">Option Three</option>
          </select>
  
        </div>
      </form>
    `,
    buttons: {
      no: {
        icon: '<i class="fas fa-times"></i>',
        label: 'Cancel'
      },
      yes: {
        icon: '<i class="fas fa-check"></i>',
        label: 'Yes',
        callback: (html) => {
          let select1 = html.find('[name="exampleSelect1"]').val();
  let select2 = html.find('[name="exampleSelect2"]').val();
          console.log(select1, select2);
        }
      },
    },
    default: 'yes',
    close: () => {
      console.log('Example Dialog Closed');
    }
  }).render(true)