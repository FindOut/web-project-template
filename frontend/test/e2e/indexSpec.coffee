describe "dashboard", ->
  DashboardView = require('./pages/dashboard')

  page = undefined

  beforeEach ->
    page = new DashboardView()
    page.get()

  expectWpsWithStatusToHaveLength = (wpElements, expectedLength) ->
    wpElements.then((arr) ->
      expect(arr.length).toEqual(expectedLength)
    )


  describe "header", ->
    it "should have a displayed header", ->
      expect(page.header.getText()).toEqual('Hansoft Web Summary')

    it "should have a last updated text", ->
      expect(page.lastUpdated.getText()).toEqual('2014-01-07 11:01')

    describe "about dialog", ->
      it "should be hidden by default", ->
        expect(page.aboutDialog.isDisplayed()).toBeFalsy()

      it "should be shown when about link is clicked", ->
        page.clickAboutLink()
        expect(page.aboutDialog.isDisplayed()).toBeTruthy()


  describe "dashboard completed wps filter", ->
    it "should hide completed wps by default", ->
      expect(page.includeCompletedCheckbox.isSelected()).toBeFalsy()
      expect(page.completedWp.isPresent()).toBeFalsy()

    it "should show completed wps ehen include checkbox is checked", ->
      page.includeCompletedCheckbox.click()
      expect(page.completedWp.isPresent()).toBeTruthy()


  describe "status filters", ->
    it "should have all status filters checked by default", ->
      page.includeCompletedCheckbox.click() # easier to count all by status...
      expect(page.onTrackCheckbox.isSelected()).toBeTruthy()
      expect(page.warningCheckbox.isSelected()).toBeTruthy()
      expect(page.offTrackCheckbox.isSelected()).toBeTruthy()

      expectWpsWithStatusToHaveLength(page.visibleOnTrackWps(), 3)
      expectWpsWithStatusToHaveLength(page.visibleWarningWps(), 12)
      expectWpsWithStatusToHaveLength(page.visibleOffTrackWps(), 40)

    it "should be able to filter all statuses", ->
      page.onTrackCheckbox.click()
      page.warningCheckbox.click()
      page.offTrackCheckbox.click()

      expectWpsWithStatusToHaveLength(page.visibleOnTrackWps(), 0)
      expectWpsWithStatusToHaveLength(page.visibleWarningWps(), 0)
      expectWpsWithStatusToHaveLength(page.visibleOffTrackWps(), 0)
