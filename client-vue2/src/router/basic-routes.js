import Lifecycle from '../views/Basic/Lifecycle.vue'
import BindIf from '../views/Basic/BindIf.vue'
import Form from '../views/Basic/Form.vue'
import For from '../views/Basic/For.vue'
import ClassStyle from '../views/Basic/ClassStyle.vue'
import ComputedWatch from '../views/Basic/ComputedWatch.vue'
import KeyReuse from '../views/Basic/KeyReuse.vue'
import Event from '../views/Basic/Event.vue'
import SlotComponent from '../views/Basic/SlotComponent.vue'

export default [
  {
    path: 'lifecycle',
    name: 'Lifecycle',
    component: Lifecycle
  },
  {
    path: 'bindIf',
    name: 'BindIf',
    component: BindIf
  },
  {
    path: 'form',
    name: 'Form',
    component: Form
  },
  {
    path: 'for',
    name: 'For',
    component: For
  },
  {
    path: 'classStyle',
    name: 'ClassStyle',
    component: ClassStyle
  },
  {
    path: 'computedWatch',
    name: 'ComputedWatch',
    component: ComputedWatch
  },
  {
    path: 'keyReuse',
    name: 'KeyReuse',
    component: KeyReuse
  },
  {
    path: 'event',
    name: 'Event',
    component: Event
  },
  {
    path: 'slotComponent',
    name: 'SlotComponent',
    component: SlotComponent
  }
]
