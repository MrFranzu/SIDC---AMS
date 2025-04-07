import { Component, AfterViewInit, OnDestroy, NgZone } from "@angular/core";
import * as L from "leaflet";
import * as locationsData from "../../common/json/location.json";

const MAP_CENTER: [number, number] = [12.8797, 121.774]; // Philippines center
const MAP_ZOOM = { default: 6, min: 5, max: 12 };
const ICON_URL = "https://cdn-icons-png.flaticon.com/512/684/684908.png";

interface Location {
  name: string;
  lat: number;
  lng: number;
  region: string;
  members: number;
}

@Component({
  selector: "app-map-dashboard",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: L.Map | null = null;
  private markers: L.Marker[] = [];
  private currentIconSize: [number, number] = [30, 40];

  selectedLocation: Location | null = null;
  locationData: Location[] = (locationsData as any).default || locationsData;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => this.initMap());
  }

  private initMap(): void {
    const mapContainer = document.getElementById("philippines-map");
    if (!mapContainer) {
      console.warn("Map container not found");
      return;
    }

    this.map = L.map(mapContainer, {
      center: MAP_CENTER,
      zoom: MAP_ZOOM.default,
      minZoom: MAP_ZOOM.min,
      maxZoom: MAP_ZOOM.max,
      zoomControl: true,
      dragging: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap Contributors",
    }).addTo(this.map);

    this.addLocationMarkers();
    this.setupZoomListener();
  }

  private createIcon(size: [number, number]): L.Icon {
    return L.icon({
      iconUrl: ICON_URL,
      iconSize: size,
      iconAnchor: [size[0] / 2, size[1]],
      popupAnchor: [0, -size[1] / 2],
    });
  }

  private addLocationMarkers(): void {
    this.clearMarkers();

    this.locationData.forEach((location) => {
      if (!this.map) return;

      const marker = L.marker([location.lat, location.lng], {
        icon: this.createIcon(this.currentIconSize),
      }).addTo(this.map);

      marker.bindPopup(this.getPopupContent(location), { autoPan: false });
      marker.on("click", () => this.handleMarkerClick(marker, location));
      marker.on("popupopen", () => this.setupPopupCloseEvent(location));

      this.markers.push(marker);
    });
  }

  private getPopupContent(location: Location): string {
    return `
      <div class="map-popup">
        <button class="popup-close-btn" id="popup-close-${this.formatId(
          location.name
        )}">X</button>
        <h4>${location.name}</h4>
        <p><strong>Region:</strong> ${location.region}</p>
        <p><strong>Members:</strong> ${location.members.toLocaleString()}</p>
      </div>
    `;
  }

  private handleMarkerClick(marker: L.Marker, location: Location): void {
    this.ngZone.run(() => {
      this.selectedLocation = location;
      this.map?.setView([location.lat, location.lng], 10, { animate: true });
      marker.openPopup();
    });
  }

  private setupPopupCloseEvent(location: Location): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        const closeBtn = document.getElementById(
          `popup-close-${this.formatId(location.name)}`
        );
        if (closeBtn) {
          L.DomEvent.on(closeBtn, "click", (event) => {
            L.DomEvent.stopPropagation(event); // Prevents accidental closing
            this.ngZone.run(() => this.resetMap());
          });
        }
      }, 0);
    });
  }

  resetMap(): void {
    if (this.map) {
      this.map.setView(MAP_CENTER, MAP_ZOOM.default, { animate: true });
      this.selectedLocation = null;
      this.map.closePopup();
    }
  }

  private setupZoomListener(): void {
    if (!this.map) return;

    this.ngZone.runOutsideAngular(() => {
      this.map!.on("zoomend", () => {
        const zoomLevel = this.map?.getZoom() || MAP_ZOOM.default;
        const newSize: [number, number] = zoomLevel < 7 ? [20, 30] : [30, 40];

        // Update markers only if size has changed
        if (this.currentIconSize[0] !== newSize[0]) {
          this.currentIconSize = newSize;
          this.markers.forEach((marker) =>
            marker.setIcon(this.createIcon(newSize))
          );
        }
      });
    });
  }

  private clearMarkers(): void {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
  }

  private formatId(name: string): string {
    return name.replace(/\s+/g, "-");
  }

  ngOnDestroy(): void {
    this.clearMarkers();
    this.map?.remove();
    this.map = null;
  }
}
