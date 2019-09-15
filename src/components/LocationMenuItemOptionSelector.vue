<template>
    <div>
        <!-- Menu Item Option Autocomplete -->
        <div class="container">
          <div class="ten columns">
            <span>Menu Item Option: </span>
            <v-select
              @input="handleMenuItemOptionSelected($event)"
              :options="originalMenuItemOptions.map(i => i.name)"
            />
          </div>

          <div class="one column">
            <!-- <a class="button" href="#" disabled>Add New Menu Option</a> -->
          </div>
        </div>

        <!-- Menu Item Options -->
        <div class="container" style="margin-top: 2em">
          <ul class="tab-nav">
            <li v-for="(option, index) in selectedMenuItemOptions.map(i => i.name)" :key="option">
              <a
                @click="activeSelectedMenuItemOptionPaneIndex = index"
                :class="{ 'active': activeSelectedMenuItemOptionPaneIndex == index, 'button': true }"
                :href="`#option-value-${index}`"
              >
                {{ option }}
              </a>
            </li>
          </ul>

          <div class="tab-content">
            <!-- Menu Item Option Values -->
            <div
              :class="{ 'active': activeSelectedMenuItemOptionPaneIndex == index, 'tab-pane': true }"
              v-for="(option, index) in selectedMenuItemOptions.map(i => i.name)"
              :key="option"
              :id="`option-value-${index}`"
            >
              <table class="u-full-width">
                <thead>
                  <tr>
                    <th>Option Value</th>
                    <th>Option Price</th>
                    <th>Option Stock Quantity</th>
                    <th>Subtract Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(optionValue, ovIndex) in selectedMenuItemOptions[index].option_values" :key="optionValue.id">
                    <td>
                      <v-select
                        :options="selectedMenuItemOptionsClones[index].option_values.map(i => i.value)"
                        :value="selectedMenuItemOptionsClones[index].option_values.map(i => i.value)[ovIndex]"
                      />
                    </td>
                    <td><input v-model="optionValue.price"/></td>
                    <td><input v-model="optionValue.stock_quantity"/></td>
                    <td>
                      <select v-model="optionValue.subtract_stock">
                        <option :value="true">Yes</option>
                        <option :value="false">No</option>
                      </select>
                    </td>
                    <td>
                      <button
                        @click="selectedMenuItemOptions[index].option_values.splice(ovIndex, 1)"
                        class="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <button
                    class="button"
                    @click="selectedMenuItemOptions[index].option_values.push({})"
                  >
                    Add Row
                  </button>
                </tbody>
              </table>
            </div>
            <button class="button">Save All</button>
          </div>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import getLocationMenuItems from '../services/getLocationMenuItems';

export default {
    components: {'v-select': vSelect},
    data() {
      return {
        /**
         * The active menu item option pane index.
         */
        activeSelectedMenuItemOptionPaneIndex: 0,

        /**
         * Menu item options that have been overridden.
         */
        selectedMenuItemOptions: [],
        selectedMenuItemOptionsClones: [],

        /**
         * Remaining menu item options that can be overridden.
         */
        originalMenuItemOptions: [],
      }
    },
    props: ['resourceName', 'resourceId', 'field'],
    async mounted() {
        this.originalMenuItemOptions = await getLocationMenuItems();
    },
    methods: {
      /**
       * Takes a menu item option from the remaining menu item options.
       */
      takeMenuItemOption(name) {
        const menuItemOption = this.originalMenuItemOptions.filter(i => i.name == name)[0];

        this.originalMenuItemOptions = this.originalMenuItemOptions.filter(i => i.name !== name);

        return menuItemOption;
      },

      /**
       * Handles a menu item option being selected from the dropdown.
       */
      handleMenuItemOptionSelected(name) {

        // Take from original menu items collection and added to selected.
        const menuItemOption = this.takeMenuItemOption(name)
        this.selectedMenuItemOptions.push(menuItemOption);
        this.selectedMenuItemOptionsClones.push(Object.assign({}, menuItemOption));
      },
    },
}
</script>
