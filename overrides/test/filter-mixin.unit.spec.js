import chai, {expect} from "chai"
import spies from "chai-spies"
import FilterMixin from "../src/filter-mixin"
import dc from "../../index"

chai.use(spies)

describe("Filter Mixin", () => {
  let chart
  beforeEach(() => {
    chart = FilterMixin(dc.baseMixin({}))
  })
  describe("hasFilterHandler", () => {
    it("should handler cases where second argument if array of object collections", () => {
      const range = [new Date("7/1/2009"), new Date("6/1/2010")]
      const filters = [range]
      const filter = [[{value: range[0]}, {value: range[1]}]]
      expect(chart.hasFilterHandler()(filters, filter))
    })
  })
  describe("filter method", () => {
    describe("null case", () => {
      it("should call resetFilterHandler", () => {
        const handler = chai.spy(() => [])
        chart.resetFilterHandler(handler)
        chart.filter(null)
        expect(handler).to.have.been.called.with([])
      })
      it("should reset _filters", () => {
        chart.filter("Test")
        expect(chart.filter()).to.deep.equal("Test")
        chart.filter(null)
        expect(chart.filter()).to.deep.equal(null)
      })
    })
    describe("empty array case", () => {
      it("should call resetFilterHandler", () => {
        const handler = chai.spy(() => [])
        chart.resetFilterHandler(handler)
        chart.filter([])
        expect(handler).to.have.been.called.with([])
      })
      it("should reset _filters", () => {
        chart.filter(["test"])
        expect(chart.filter()).to.deep.equal("test")
        chart.filter([])
        expect(chart.filter()).to.deep.equal(null)
      })
    })
  })
  describe("handleFilterClick function", () => {
    it("should do nothing if default was prevented", () => {
      const event = {
        defaultPrevented: true
      }
      chart.handleFilterClick(event)
      expect(chart.filter()).to.deep.equal(null)
    })

    it("should set filter", () => {
      const event = {}
      const filter = ["filter"]
      chart.handleFilterClick(event, filter)

      expect(chart.filter()).to.deep.equal("filter")
    })
  })
})