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

                <a class="pull-right button" @click="handleMenuItemOptionRemoved(option)">X</a>
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
                        :options="allMenuItemOptions[index].option_values.map(i => i.value)"
                        :value="allMenuItemOptions[index].option_values.map(i => i.value)[ovIndex]"
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
            <button class="button" @click="saveAll">Save All</button>
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
        allMenuItemOptions: [],
        selectedMenuItemOptions: [],
        originalMenuItemOptions: [],
        activeSelectedMenuItemOptionPaneIndex: 0,
      }
    },
    props: ['resourceName', 'resourceId', 'field'],
    async mounted() {
        this.originalMenuItemOptions = await getLocationMenuItems();
        this.allMenuItemOptions = JSON.parse(JSON.stringify(
          this.originalMenuItemOptions
        ));
    },
    methods: {
      /**
       * Saves the state of the selected menu item options.
       */
      saveAll() {
        // Validation
      },

      /**
       * Takes a menu item option from the remaining menu item options.
       */
      findMenuItemOptionByName(name) {
        return this.allMenuItemOptions.filter(i => i.name === name)[0];
      },

      /**
       * Handles a menu item option being selected from the dropdown.
       */
      handleMenuItemOptionSelected(name) {
        const menuItemOption = this.findMenuItemOptionByName(name);
        this.originalMenuItemOptions = this.originalMenuItemOptions.filter(i => i.name !== name);
        this.selectedMenuItemOptions.push(menuItemOption);
      },

      /**
       * Handles a selected menu item tab being closed.
       */
      handleMenuItemOptionRemoved(name) {
        const menuItemOption = this.findMenuItemOptionByName(name);
        this.selectedMenuItemOptions = this.selectedMenuItemOptions.filter(i => i.name !== name);
        this.originalMenuItemOptions.push(menuItemOption);
      }
    },
}
</script>
