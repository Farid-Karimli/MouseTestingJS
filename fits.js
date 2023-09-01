class FitsLaw {
  constructor(target_width, distance_to_target) {
    this.target_width = target_width;
    this.distance_to_target = distance_to_target;
    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.movement_amplitudes = [];
    this.selection_coordinates = [];
    this.f = 0;
    this.to = 0;
    this.select = 0;
    this.ae = 0;
    this.dx = 0;
    this.times = [];
    this.ballistic_times = [];
    this.time_to_select = [];
  }

  __repr__() {
    return `from: ${this.f}
to: ${this.to}
select: ${this.select}`;
  }

  calculate_original_law(time) {
    var ID, MT;
    ID = Math.log2(this.distance_to_target / this.target_width + 1);
    MT = time;
    return ID / MT;
  }

  distance(x1, y1, x2, y2) {
    return Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5);
  }

  calculate_a() {
    this.a = this.distance(this.f[0], this.f[1], this.to[0], this.to[1]);
  }

  calculate_b() {
    this.b = this.distance(this.to[0], this.to[1], this.select[0], this.select[1]);
  }

  calculate_c() {
    this.c = this.distance(this.f[0], this.f[1], this.select[0], this.select[1]);
  }

  update() {
    var dx;
    this.calculate_a();
    this.calculate_b();
    this.calculate_c();
    dx = (Math.pow(this.c, 2) - Math.pow(this.b, 2) - Math.pow(this.a, 2)) / (2 * this.a);
    this.movement_amplitudes.push(this.a + dx);
    this.selection_coordinates.push(dx);
  }

  calculate_modified_law() {
    var ID, MT, avg, std;
    std = standardDeviation(this.selection_coordinates);
    avg = mean(this.movement_amplitudes);
    ID = Math.log2(avg / (4.133 * std) + 1);
    MT = mean(this.times);

    console.log("ID", ID);
    console.log("MT", MT);
    console.log("std", std);
    console.log("avg", avg);
    
    return ID / MT;
  }

  get_average_times() {
    return [mean(this.ballistic_times), mean(this.time_to_select)];
  }

}
