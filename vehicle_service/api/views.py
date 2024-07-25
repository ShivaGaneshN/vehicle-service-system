from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Component, Vehicle, Issue, Repair, Invoice
from .serializers import ComponentSerializer, VehicleSerializer, IssueSerializer, RepairSerializer, InvoiceSerializer
from django.db.models import Sum
from django.utils import timezone
from django.db import transaction

class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


class RepairViewSet(viewsets.ModelViewSet):
    queryset = Repair.objects.all()
    serializer_class = RepairSerializer

    def create(self, request, *args, **kwargs):
        with transaction.atomic():
            repair_serializer = self.get_serializer(data=request.data)
            repair_serializer.is_valid(raise_exception=True)
            repair = repair_serializer.save()

            # Create or update the invoice
            invoice, created = Invoice.objects.get_or_create(
                vehicle=repair.issue.vehicle,
                paid=False,
                defaults={'total_amount': repair.price}
            )
            if not created:
                invoice.total_amount += repair.price
                invoice.save()

            repair.invoice = invoice
            repair.save()

        return Response(repair_serializer.data)

    def update(self, request, *args, **kwargs):
        with transaction.atomic():
            instance = self.get_object()
            old_price = instance.price
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            repair = serializer.save()

            # Update the invoice
            if repair.invoice:
                invoice = repair.invoice
                invoice.total_amount += (repair.price - old_price)
                invoice.save()
            else:
                # Create a new invoice if it doesn't exist
                invoice = Invoice.objects.create(
                    vehicle=repair.issue.vehicle,
                    total_amount=repair.price
                )
                repair.invoice = invoice
                repair.save()

        return Response(serializer.data)

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    @action(detail=False, methods=['get'])
    def revenue_stats(self, request):
        today = timezone.now().date()
        this_month = today.replace(day=1)
        this_year = today.replace(month=1, day=1)

        daily_revenue = Invoice.objects.filter(created_at__date=today, paid=True).aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        monthly_revenue = Invoice.objects.filter(created_at__gte=this_month, paid=True).aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        yearly_revenue = Invoice.objects.filter(created_at__gte=this_year, paid=True).aggregate(Sum('total_amount'))['total_amount__sum'] or 0

        return Response({
            'daily_revenue': daily_revenue,
            'monthly_revenue': monthly_revenue,
            'yearly_revenue': yearly_revenue
        })