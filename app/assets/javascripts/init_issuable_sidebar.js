/* eslint-disable no-new */
/* global MilestoneSelect */
/* global LabelsSelect */
<<<<<<< HEAD
/* global WeightSelect */
=======
>>>>>>> bfb5107ae720232a15060ee55feba213ee7dd097
import IssuableContext from './issuable_context';
/* global Sidebar */

import DueDateSelectors from './due_date_select';

export default () => {
  const sidebarOptions = JSON.parse(document.querySelector('.js-sidebar-options').innerHTML);

  new MilestoneSelect({
    full_path: sidebarOptions.fullPath,
  });
  new LabelsSelect();
  new WeightSelect();
  new IssuableContext(sidebarOptions.currentUser);
  gl.Subscription.bindAll('.subscription');
  new DueDateSelectors();
  window.sidebar = new Sidebar();
};
