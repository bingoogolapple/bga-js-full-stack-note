import { observable, action } from 'mobx'

export abstract class BaseViewModel {
  @observable loading: boolean = false
  @observable loadingText?: string

  @action.bound
  showLoadingDialog(loadingText?: string) {
    this.loading = true
    this.loadingText = loadingText
  }

  @action.bound
  dismissLoadingDialog() {
    this.loading = false
  }
}
