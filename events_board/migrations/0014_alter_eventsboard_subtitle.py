# Generated by Django 3.2 on 2021-05-09 03:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events_board', '0013_alter_eventsboard_event_tag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventsboard',
            name='subtitle',
            field=models.CharField(blank=True, max_length=70),
        ),
    ]